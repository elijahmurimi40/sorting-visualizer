import React, { RefObject, MouseEvent, Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { Menu } from 'semantic-ui-react';
import Nav from './Nav';
import './TopNav.css';
import { comparisonSortingAlgorithmOptions } from '../sorting_algorithms/sorting_algorithm_options';

type Props = {
  children: {
    topNav: RefObject<HTMLDivElement> | null,
    generateNewArray: (e: MouseEvent) => void,
    sortArray: (e: MouseEvent, p: string) => void
  }
}

let [value, setValue]: [string | null, Dispatch<SetStateAction<string>> | null] = [null, null];
// Select sorting algorithm

function TopNav(props: Props) {
  [value, setValue] = useState('')

  const { topNav, generateNewArray, sortArray } = props.children;
  const options = [];
  const comparisonSort = comparisonSortingAlgorithmOptions();

  for (let i = 0; i < comparisonSort.length; i++) {
    const _comparisonSort = comparisonSortingAlgorithmOptions()[i];
    options.push(
      <option key={_comparisonSort.key} value={_comparisonSort.value}>
        {_comparisonSort.text}
      </option>
    );
  }

  return (
    <div className='ui menu' ref={topNav}>
      <span className='show-for-large'>
        <Nav>{{ generateNewArray }}</Nav>
      </span>

      <Menu.Item>
        {/* <select style={{ padding: '5px 5px' }} name='sorting_algorithms'
          className='ui selection dropdown'
        > */}
        <select style={{ padding: '5px 5px' }} name='sorting_algorithms'
          className='ui selection fluid dropdown'
          defaultValue=''
          onChange={getAndSetValue}
        >
          <option value='' disabled>Select Sorting Algorithm</option>
          {options}
        </select>
      </Menu.Item>

      <Menu.Item>
        <a href='/sort' className='ui fluid blue submit button'
          onClick={event => sortArray(event, value!!)}>Sort</a>
      </Menu.Item>
    </div>
  );
}

const getAndSetValue = (e: ChangeEvent<HTMLSelectElement>) => {
  setValue!!(e.target.value);
}

export default TopNav;