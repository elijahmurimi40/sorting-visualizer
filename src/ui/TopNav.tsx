import React, {
  RefObject, MouseEvent, useState, ChangeEvent,
} from 'react';
import { Menu } from 'semantic-ui-react';
import Nav from './Nav';
import './TopNav.css';
import comparisonSortingAlgorithmOptions from '../sorting_algorithms/sorting_algorithm_options';

type Props = {
  children: {
    topNav: RefObject<HTMLDivElement> | null,
    // eslint-disable-next-line no-unused-vars
    generateNewArray: (e: MouseEvent) => void,
    // eslint-disable-next-line no-unused-vars
    sortArray: (e: MouseEvent, p: string) => void
  }
}
// Select sorting algorithm

function TopNav(props: Props) {
  const [value, setValue] = useState('');

  const { children } = props;
  const { topNav, generateNewArray, sortArray } = children;
  // const { topNav, generateNewArray, sortArray } = props.children;
  const options = [];
  const comparisonSort = comparisonSortingAlgorithmOptions();

  const getAndSetValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue!!(e.target.value);
  };

  for (let i = 0; i < comparisonSort.length; i += 1) {
    const comparisonSortVal = comparisonSortingAlgorithmOptions()[i];
    options.push(
      <option key={comparisonSortVal.key} value={comparisonSortVal.value}>
        {comparisonSortVal.text}
      </option>,
    );
  }

  return (
    <div className="ui menu" ref={topNav}>
      <span className="show-for-large">
        <Nav>{{ generateNewArray }}</Nav>
      </span>

      <Menu.Item>
        {/* <select style={{ padding: '5px 5px' }} name='sorting_algorithms'
          className='ui selection dropdown'
        > */}
        <select
          style={{ padding: '5px 5px' }}
          name="sorting_algorithms"
          className="ui selection fluid dropdown"
          defaultValue=""
          onChange={getAndSetValue}
        >
          <option value="" disabled>Select Sorting Algorithm</option>
          {options}
        </select>
      </Menu.Item>

      <Menu.Item>
        <a
          href="/sort"
          className="ui fluid blue submit button"
          onClick={(event) => sortArray(event, value!!)}
        >
          Sort
        </a>
      </Menu.Item>
    </div>
  );
}

export default TopNav;
