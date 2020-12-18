import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header, Label, Message } from 'semantic-ui-react';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';

let n = 0;
// let _i = -1;
let isArrayBeingGenerated = false
let current_width: number;
let _holderDivWidth = 0;
let barHeight = 0;
let debounceTimer: number = 0;

const minWidth = 2;
const maxWidth = 50;

function App() {
  const topNav = useRef<HTMLDivElement>(null);
  const bottomNav = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const loadingIndicator = useRef<HTMLDivElement>(null);
  const holderDiv = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLInputElement>(null);
  const barValue = useRef<Array<HTMLSpanElement>>([]);
  const buttomSection = useRef<HTMLDivElement>(null);
  const arrayBars = useRef<Array<HTMLDivElement>>([]);

  const sliderValue = useRef(() => { });
  const calculateAndSetDimension = useRef(() => { });

  const [containerHeight, setContainerHeight] = useState(0);
  const [array, setArray] = useState([0]);
  const [showMessage, setShowMessage] = useState(false as boolean);

  const topNavHeight = () => {
    return topNav.current!!.clientHeight;
  }

  const bottomNavHeight = () => {
    return bottomNav.current!!.clientHeight;
  }

  const containerTopMargin = () => {
    return container.current!!.offsetTop;
  }

  const holderDivWidth = () => {
    return holderDiv.current!!.clientWidth;
  }

  const buttomSectionHeight = () => {
    return buttomSection.current!!.clientHeight;
  }

  const generateArray = async (size: number) => {
    show(loadingIndicator.current!!);
    const _array: Array<number> = [];

    for (let i = 0; i < size; i++) {
      // _i = i;
      isArrayBeingGenerated = true
      if (size !== n) { break };
      _array.push(randomIntFromInterval(5, barHeight));
      // await timer(1000);
    }

    if (size === n) {
      setArray!!(_array);
      hide(loadingIndicator.current!!);
      // _i = -1;
      isArrayBeingGenerated = false
    }
  }

  const generateArray2 = (size: number) => {}

  const generateArrayOnClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!isArrayBeingGenerated) generateArray(n)
    // if (_i === -1) generateArray(n);
  }

  sliderValue.current = () => {
    const _slider = slider.current!!;
    setCurrentWidth(_slider);
    _slider.oninput = () => {
      setCurrentWidth(_slider);
      n = Math.floor(_holderDivWidth / (current_width + minWidth));
      // if(current_width === _slider.valueAsNumber) {
      //   true;
      // } else {
      //   false;
      // }
      generateArray(n);
    }
  }

  calculateAndSetDimension.current = () => {
    const _windowHeight = window.innerHeight;
    const _topNavHeight = topNavHeight();
    const _bottomNavHeight = bottomNavHeight();
    const _containerTopMargin = containerTopMargin();

    const height = _windowHeight - _containerTopMargin - (_containerTopMargin - _topNavHeight) - _bottomNavHeight;

    setContainerHeight!!(height);

    _holderDivWidth = holderDivWidth();
    const _buttomSectionHeight = buttomSectionHeight();
    barHeight = height - _buttomSectionHeight - 10;

    n = Math.floor(_holderDivWidth / (current_width + minWidth));
    // n += 2;
    // -i = 0;
    // _i = 0;
    isArrayBeingGenerated = true
    generateArray(n);
    clearTimeout(debounceTimer);
  }

  const sortArray = (e: MouseEvent, key: string) => {
    e.preventDefault();
    switch (key) {
      case 'bubble_sort':
        alert('implement bubble sort');
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
      case 'quck_sort':
        alert('implement quck sort');
        break;
      default:
        setShowMessage!!(true);
        const timer = setTimeout(() => {
          setShowMessage!!(false)
          clearTimeout(timer);
        }, 3000);
    }
  }

  useEffect(() => {
    sliderValue.current();
    calculateAndSetDimension.current();
    // effect
    window.addEventListener('resize', debounce(calculateAndSetDimension.current));

    return () => {
      // cleanup
      window.removeEventListener('resize', debounce(calculateAndSetDimension.current));
    }
  }, []);

  return (
    <div>
      <TopNav>
        {{ topNav: topNav, generateNewArray: generateArrayOnClick, sortArray: sortArray }}
      </TopNav>
      <Container className='container'
        style={{ height: containerHeight }}
        ref={container}
      >
        <Row>
          <Col />
          <Col
            style={{ height: containerHeight }}
            className='sort-div' lg={12} md={12} sm={12} xl={12} xs={12}
          >
            <div ref={holderDiv} className='holder'>
              {
                array.map((value, idx) => (
                  <div
                    // ref={(element) => arrayBar.current!!.push(element!!)}
                    ref={(element: HTMLDivElement) => arrayBars.current[idx] = element}
                    style={{ width: current_width, height: `${value}px` }}
                    className='array-bar' key={idx}
                  >
                    <span ref={(element: HTMLSpanElement) => barValue.current[idx] = element}
                      className='span-value text-align'>
                      {hideShowValue(value)}
                    </span>
                  </div>
                ))
              }
              <div ref={buttomSection}>
                <div className='finish-button'>
                  <a href='/finish' className='ui secondary submit button inverted'>Finish</a>
                </div>
                <div>Change Array Size and Sorting Speed</div>
                <div>
                  <input ref={slider} type='range' min={minWidth} max={maxWidth} defaultValue='2' />
                </div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
      <BottomNav>{{ bottomNav: bottomNav, generateNewArray: generateArrayOnClick }}</BottomNav>

      <div ref={loadingIndicator}>
        <div className='info'>
          <Header textAlign='center' block>
            <Label color='grey' size='large'>Loading .....</Label>
          </Header>
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true"
        style={{
          position: 'relative',
          display: showMessage ? 'block' : 'none'
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          {
            (showMessage)
          }
          <Message negative compact style={{ width: '305px' }}
            onDismiss={() => setShowMessage!!(false)}
          >
            <Message.Header>Sorting Visualizer</Message.Header>
            <p>Please Select a Sorting Algorithm.</p>
          </Message>
        </div>
      </div>
    </div>
  );
}

const setCurrentWidth = (_slider: HTMLInputElement) => {
  if (_slider.valueAsNumber % 2 === 0) {
    current_width = (maxWidth - _slider.valueAsNumber) + minWidth;
  }
}

const hideShowValue = (value: number) => {
  return current_width >= 40 ? value : '';
}

const debounce = (callBack: () => void, time: number = 305) => {
  debounceTimer = 0;
  return () => {
    if (debounceTimer ) clearTimeout(debounceTimer);
    debounceTimer  = window.setTimeout(callBack, time);
  }
}

// const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const show = (element: HTMLElement) => {
  element.classList.remove('hide');
}

const hide = (element: HTMLElement) => {
  element.classList.add('hide');
}

export default App;
