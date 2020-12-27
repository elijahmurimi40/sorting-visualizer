import React, {
  useEffect, useRef, useState, MouseEvent,
} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header, Label, Message } from 'semantic-ui-react';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';
import { stopSortTimers } from './sortingAlgorithms/sortingTimers';
import { Bar, ArrayBars } from './helperFunctions/ArrayBars';
import barStates from './helperFunctions/barStates';
import bubbleSort from './sortingAlgorithms/bubbleSort';
import insertionSort from './sortingAlgorithms/insertionSort';
import selectionSort from './sortingAlgorithms/selectionSort';

let n = 0;
// let _i = -1;
let isArrayBeingGenerated = false;
let currentWidth: number;
let holderDivWidthVal = 0;
let barHeight = 0;
let debounceTimer: number = 0;
let isSorting = false;
let sortingTimer = 0;

const minWidth = 2;
const maxWidth = 50;

const debounce = (callBack: () => void, time: number = 305) => {
  debounceTimer = 0;
  return () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callBack, time);
  };
};

const show = (element: HTMLElement) => {
  element.classList.remove('hide');
};

const hide = (element: HTMLElement) => {
  element.classList.add('hide');
};

// const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
const randomBumber = (min: number, max: number) => Math.random() * (max - min + 1) + min;
const randomIntFromInterval = (min: number, max: number) => Math.floor(randomBumber(min, max));

const setCurrentWidth = (_slider: HTMLInputElement) => {
  // get value of slider and calculate the width of each bar
  if (_slider.valueAsNumber % 2 === 0) {
    currentWidth = (maxWidth - _slider.valueAsNumber) + minWidth;
    // sortingTimer = currentWidth;
    sortingTimer = (maxWidth - _slider.valueAsNumber) + minWidth;
  }
};

const hideShowValue = (value: number) => (currentWidth >= 40 ? value : '');

const getColor = (state: string) => {
  let backgroundColor = '';

  switch (state) {
    case barStates.defaultState:
      backgroundColor = '#2185d0';
      break;
    case barStates.selectedState:
      backgroundColor = '#ff0000';
      break;
    case barStates.sortedState:
      backgroundColor = '#40e0d0';
      break;
    default:
      backgroundColor = '#2185d0';
  }

  return backgroundColor;
};

function App() {
  const topNav = useRef<HTMLDivElement>(null);
  const bottomNav = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const loadingIndicator = useRef<HTMLDivElement>(null);
  const holderDiv = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLInputElement>(null);
  const buttomSection = useRef<HTMLDivElement>(null);
  const select = useRef<HTMLSelectElement>(null);
  const arrayBars = useRef<Array<HTMLDivElement>>([]);
  const barValues = useRef<Array<HTMLSpanElement>>([]);

  const sliderValue = useRef(() => { });
  const calculateAndSetDimension = useRef(() => { });

  const [containerHeight, setContainerHeight] = useState(0);
  const [array, setArray] = useState<ArrayBars>([]);
  const [showMessage, setShowMessage] = useState(false as boolean);

  const topNavHeight = () => topNav.current!!.clientHeight;
  const bottomNavHeight = () => bottomNav.current!!.clientHeight;
  const containerTopMargin = () => container.current!!.offsetTop;
  const holderDivWidth = () => holderDiv.current!!.clientWidth;
  const buttomSectionHeight = () => buttomSection.current!!.clientHeight;

  const generateArray = async (size: number) => {
    show(loadingIndicator.current!!);
    const arr: ArrayBars = [];

    for (let i = 0; i < size; i += 1) {
      // _i = i;
      isArrayBeingGenerated = true;
      if (size !== n) { break; }
      arr.push({
        value: randomIntFromInterval(5, barHeight),
        state: barStates.defaultState,
        idx: i,
      });
      // await timer(1000);
    }

    if (size === n) {
      setArray!!(arr);
      hide(loadingIndicator.current!!);
      // _i = -1;
      isArrayBeingGenerated = false;
    }
  };

  const generateArrayOnClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!isArrayBeingGenerated && !isSorting) generateArray(n);
    // if (_i === -1) generateArray(n);
  };

  sliderValue.current = () => {
    const sliderVal = slider.current!!;
    setCurrentWidth(sliderVal);
    // generate random array bars as slider is moved
    sliderVal.oninput = () => {
      setCurrentWidth(sliderVal);
      n = Math.floor(holderDivWidthVal / (currentWidth + minWidth));
      generateArray(n);
    };
  };

  const disableUIElements = () => {
    isSorting = true;
    slider.current!!.disabled = true;
    select.current!!.disabled = true;
  };

  const enableUIElements = () => {
    isSorting = false;
    slider.current!!.disabled = false;
    select.current!!.disabled = false;
  };

  const restoreArrayBars = (arr: ArrayBars) => {
    arr.map((val: Bar, idx) => {
      arrayBars.current[idx].style.backgroundColor = '#2185d0';
      arrayBars.current[idx].style.height = `${val.value}px`;
      barValues.current[idx].textContent = hideShowValue(val.value) as unknown as string;
      return arr;
    });
  };

  calculateAndSetDimension.current = () => {
    stopSortTimers();
    const windowHeight = window.innerHeight;
    const topNavHeightVal = topNavHeight();
    const bottomNavVal = bottomNavHeight();
    const containerTopMarginVal = containerTopMargin();

    // calculate the remaining window height to show bars
    const remainingWindowHeight = windowHeight - containerTopMarginVal;
    const spaceBetweenTopNavAndContainerOffset = containerTopMarginVal - topNavHeightVal;
    const height = remainingWindowHeight - spaceBetweenTopNavAndContainerOffset - bottomNavVal;

    setContainerHeight!!(height);

    // holder div containing the bars and calculating the maximum bar height
    holderDivWidthVal = holderDivWidth();
    const buttomSectionHeightVal = buttomSectionHeight();
    barHeight = height - buttomSectionHeightVal - 10;

    /*
      calculating the number of random bars to generate according to the available width
      and the value of the slider
    */
    n = Math.floor(holderDivWidthVal / (currentWidth + minWidth));
    // n += 2;
    // -i = 0;
    // _i = 0;
    isArrayBeingGenerated = true;
    generateArray(n);
    clearTimeout(debounceTimer);
    enableUIElements();
  };

  const isArraySorted = () => {
    if (isArrayBeingGenerated) return true;
    const jsSortedArray = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
    return JSON.stringify(array) === JSON.stringify(jsSortedArray);
  };

  const finishSortArrayHelper = (arr: ArrayBars) => {
    stopSortTimers();
    enableUIElements();
    restoreArrayBars(arr);
  };

  const finishSortArray = (e: MouseEvent) => {
    e.preventDefault();
    const arr = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
    finishSortArrayHelper(arr);
  };

  const sortArray = (e: MouseEvent, key: string) => {
    e.preventDefault();
    let timer = 0;
    switch (key) {
      case 'bubble_sort':
        if (isArraySorted() || isSorting) return;
        disableUIElements();
        bubbleSort(
          array,
          arrayBars,
          barValues,
          sortingTimer,
          finishSortArrayHelper,
          hideShowValue,
        );
        break;
      case 'insertion_sort':
        if (isArraySorted() || isSorting) return;
        disableUIElements();
        insertionSort(
          array,
          arrayBars,
          barValues,
          sortingTimer,
          finishSortArrayHelper,
          hideShowValue,
        );
        break;
      case 'selection_sort':
        if (isArraySorted() || isSorting) return;
        disableUIElements();
        selectionSort(
          array,
          arrayBars,
          barValues,
          sortingTimer,
          finishSortArrayHelper,
          hideShowValue,
        );
        break;
      case 'shell_sort':
        alert('implement shell sort');
        break;
      case 'merge_sort':
        alert('implement merge sort');
        break;
      case 'quick_sort':
        alert('implement quick sort');
        break;
      default:
        setShowMessage!!(true);
        timer = window.setTimeout(() => {
          setShowMessage!!(false);
          clearTimeout(timer);
        }, 3000);
    }
  };

  const setBarColor = (idx: number) => {
    const ab = arrayBars.current[idx];
    const bv = barValues.current[idx];
    if (ab !== undefined && ab !== null) {
      ab.style.backgroundColor = '#2185d0';
      ab.style.height = `${array[idx].value}px`;
      bv.textContent = hideShowValue(array[idx].value) as unknown as string;
    }
  };

  useEffect(() => {
    sliderValue.current();
    calculateAndSetDimension.current();
    // effect
    window.addEventListener('resize', debounce(calculateAndSetDimension.current));

    return () => {
      // cleanup
      window.removeEventListener('resize', debounce(calculateAndSetDimension.current));
    };
  }, []);

  return (
    <div>
      <TopNav>
        {{
          topNav, generateNewArray: generateArrayOnClick, sortArray, select,
        }}
      </TopNav>
      <Container
        className="container"
        style={{ height: containerHeight }}
        ref={container}
      >
        <Row>
          <Col />
          <Col
            style={{ height: containerHeight }}
            className="sort-div"
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <div ref={holderDiv} className="holder">
              {
                array.map((val: Bar, idx) => (
                  <div
                    ref={(element: HTMLDivElement) => { arrayBars.current[val.idx] = element; }}
                    style={{
                      width: currentWidth,
                      height: `${val.value}px`,
                      backgroundColor: getColor(val.state),
                    }}
                    className="array-bar"
                    // key={val.idx}
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                  >
                    { setBarColor(idx) }
                    <span
                      ref={(element: HTMLSpanElement) => { barValues.current[val.idx] = element; }}
                      className="span-value text-align"
                    >
                      {hideShowValue(val.value)}
                    </span>
                  </div>
                ))
              }
              <div ref={buttomSection}>
                <div className="finish-button">
                  <a
                    href="/finish"
                    onClick={finishSortArray}
                    className="ui secondary submit button inverted"
                  >
                    Finish
                  </a>
                </div>
                <div>Change Array Size and Sorting Speed</div>
                <div>
                  <input
                    ref={slider}
                    type="range"
                    min={minWidth}
                    max={maxWidth}
                    defaultValue="26"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
      <BottomNav>{{ bottomNav, generateNewArray: generateArrayOnClick }}</BottomNav>

      <div ref={loadingIndicator}>
        <div className="info">
          <Header textAlign="center" block>
            <Label color="grey" size="large">Loading .....</Label>
          </Header>
        </div>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          display: showMessage ? 'block' : 'none',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          {
            (showMessage)
          }
          <Message
            negative
            compact
            style={{ width: '305px' }}
            onDismiss={() => setShowMessage!!(false)}
          >
            <Message.Header>Sorting Visualizer</Message.Header>
            <p>Please Select a Sorting Algorithm.</p>
          </Message>
        </div>
      </div>
      <div className="error-div">Use Screen of 320px and above</div>
    </div>
  );
}

export default App;
