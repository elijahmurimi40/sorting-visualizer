import React, {
  useEffect, useRef, useState, MouseEvent,
} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header, Label, Message } from 'semantic-ui-react';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';

let n = 0;
// let _i = -1;
let isArrayBeingGenerated = false;
let currentWidth: number;
let holderDivWidthVal = 0;
let barHeight = 0;
let debounceTimer: number = 0;

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
  if (_slider.valueAsNumber % 2 === 0) {
    currentWidth = (maxWidth - _slider.valueAsNumber) + minWidth;
  }
};

const hideShowValue = (value: number) => (currentWidth >= 40 ? value : '');

function App() {
  const topNav = useRef<HTMLDivElement>(null);
  const bottomNav = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const loadingIndicator = useRef<HTMLDivElement>(null);
  const holderDiv = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLInputElement>(null);
  const barValues = useRef<Array<HTMLSpanElement>>([]);
  const buttomSection = useRef<HTMLDivElement>(null);
  const arrayBars = useRef<Array<HTMLDivElement>>([]);

  const sliderValue = useRef(() => { });
  const calculateAndSetDimension = useRef(() => { });

  const [containerHeight, setContainerHeight] = useState(0);
  const [array, setArray] = useState([0]);
  const [showMessage, setShowMessage] = useState(false as boolean);

  const topNavHeight = () => topNav.current!!.clientHeight;
  const bottomNavHeight = () => bottomNav.current!!.clientHeight;
  const containerTopMargin = () => container.current!!.offsetTop;
  const holderDivWidth = () => holderDiv.current!!.clientWidth;
  const buttomSectionHeight = () => buttomSection.current!!.clientHeight;

  const generateArray = async (size: number) => {
    show(loadingIndicator.current!!);
    const arr: Array<number> = [];

    for (let i = 0; i < size; i += 1) {
      // _i = i;
      isArrayBeingGenerated = true;
      if (size !== n) { break; }
      arr.push(randomIntFromInterval(5, barHeight));
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
    if (!isArrayBeingGenerated) generateArray(n);
    // if (_i === -1) generateArray(n);
  };

  sliderValue.current = () => {
    const sliderVal = slider.current!!;
    setCurrentWidth(sliderVal);
    sliderVal.oninput = () => {
      setCurrentWidth(sliderVal);
      n = Math.floor(holderDivWidthVal / (currentWidth + minWidth));
      // if(current_width === _slider.valueAsNumber) {
      //   true;
      // } else {
      //   false;
      // }
      generateArray(n);
    };
  };

  calculateAndSetDimension.current = () => {
    const windowHeight = window.innerHeight;
    const topNavHeightVal = topNavHeight();
    const bottomNavVal = bottomNavHeight();
    const containerTopMarginVal = containerTopMargin();

    const remainingWindowHeight = windowHeight - containerTopMarginVal;
    const spaceBetweenTopNavAndContainerOffset = containerTopMarginVal - topNavHeightVal;
    const height = remainingWindowHeight - spaceBetweenTopNavAndContainerOffset - bottomNavVal;
    /*
      const height =
      _windowHeightP - _containerTopMarginP - (_containerTopMarginP - _topNavHeightP)
      - _bottomNavHeightP;
    */

    setContainerHeight!!(height);

    holderDivWidthVal = holderDivWidth();
    const buttomSectionHeightVal = buttomSectionHeight();
    barHeight = height - buttomSectionHeightVal - 10;

    n = Math.floor(holderDivWidthVal / (currentWidth + minWidth));
    // n += 2;
    // -i = 0;
    // _i = 0;
    isArrayBeingGenerated = true;
    generateArray(n);
    clearTimeout(debounceTimer);
  };

  const isArraySorted = () => {
    if (isArrayBeingGenerated) return true;
    const jsSortedArray = array.slice().sort((a, b) => a - b);
    return array.join('|') === jsSortedArray.join('|');
  };

  const sortArray = (e: MouseEvent, key: string) => {
    e.preventDefault();
    let timer = 0;
    switch (key) {
      case 'bubble_sort':
        if (isArraySorted()) return;
        console.log(99);
        break;
      case 'insertion_sort':
        alert('implement inserstion sort');
        break;
      case 'selection_sort':
        alert('implement selection sort');
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

  const finishSortArray = (e: MouseEvent) => {
    e.preventDefault();
    arrayBars.current = [];
    barValues.current = [];
    const arr = array.slice().sort((a, b) => a - b);
    setArray(arr);
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
        {{ topNav, generateNewArray: generateArrayOnClick, sortArray }}
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
                array.map((value, idx) => (
                  <div
                    // ref={(element) => arrayBar.current!!.push(element!!)}
                    ref={(element: HTMLDivElement) => { arrayBars.current[idx] = element; }}
                    style={{ width: currentWidth, height: `${value}px` }}
                    className="array-bar"
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                  >
                    <span
                      ref={(element: HTMLSpanElement) => { barValues.current[idx] = element; }}
                      className="span-value text-align"
                    >
                      {hideShowValue(value)}
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
                  <input ref={slider} type="range" min={minWidth} max={maxWidth} defaultValue="2" />
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
