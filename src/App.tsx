import React, { useEffect, MutableRefObject, useRef, Dispatch, SetStateAction, useState, MouseEvent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header, Label } from 'semantic-ui-react';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';

let topNav: MutableRefObject<HTMLDivElement | null>;
let bottomNav: MutableRefObject<HTMLDivElement | null>;
let container: MutableRefObject<HTMLDivElement | null>;
let loadingIndicator: MutableRefObject<HTMLDivElement | null>;
let holderDiv: MutableRefObject<HTMLDivElement | null>;
let slider: MutableRefObject<HTMLInputElement | null>;
let barValue: MutableRefObject<HTMLSpanElement | null>;
let buttomSection: MutableRefObject<HTMLDivElement | null>;

let [containerHeight, setContainerHeight]: [number | null, Dispatch<SetStateAction<number>> | null] = [null, null];
let [array, setArray]: [Array<number> | null, Dispatch<SetStateAction<Array<number>>> | null] = [null, null];

let n = 0;
let _i = -1;
let current_width: number;
let _holderDivWidth = 0;
let barHeight = 0;

const minWidth = 2;
const maxWidth = 50;

function App() {
  topNav = useRef<HTMLDivElement>(null);
  bottomNav = useRef<HTMLDivElement>(null);
  container = useRef<HTMLDivElement>(null);
  loadingIndicator = useRef<HTMLDivElement>(null);
  holderDiv = useRef<HTMLDivElement>(null);
  slider = useRef<HTMLInputElement>(null);
  barValue = useRef<HTMLSpanElement>(null);
  buttomSection = useRef<HTMLDivElement>(null);

  [containerHeight, setContainerHeight] = useState(0);
  [array, setArray] = useState([0]);

  useEffect(() => {
    sliderValue();
    calculateAndSetDimension();
    // effect
    window.addEventListener('resize', debounce(calculateAndSetDimension));

    return () => {
      // cleanup
      window.removeEventListener('resize', debounce(calculateAndSetDimension));
    }
  }, []);

  return (
    <div>
      <TopNav>{{ topNav: topNav, generateNewArray: generateArrayOnClick }}</TopNav>
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
                    style={{ width: current_width, height: `${value}px` }}
                    className='array-bar' key={idx}
                  >
                    <span ref={barValue} className='span-value text-align'>{hideShowValue(value)}</span>
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
    </div>
  );
}

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

const setCurrentWidth = (_slider: HTMLInputElement) => {
  if (_slider.valueAsNumber % 2 === 0) {
    current_width = (maxWidth - _slider.valueAsNumber) + minWidth;
  }
}

const hideShowValue = (value: number) => {
  return current_width >= 40 ? value : '';
}

const sliderValue = () => {
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

const debounce = (callBack: () => void, time: number = 305) => {
  let timer: number = 0;
  return () => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(callBack, time);
  }
}

const calculateAndSetDimension = () => {
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
  _i = 0;
  generateArray(n);
}

const generateArrayOnClick = (e: MouseEvent) => {
  e.preventDefault();
  if (_i === -1) generateArray(n);
}

// const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

const generateArray = async (size: number) => {
  show(loadingIndicator.current!!);
  const _array: Array<number> = [];

  for (let i = 0; i < size; i++) {
    _i = i;
    if (size !== n) { break };
    _array.push(randomIntFromInterval(5, barHeight));
    // await timer(1000);
  }

  if (size === n) {
    setArray!!(_array);
    hide(loadingIndicator.current!!);
    _i = -1;
  }
}

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
