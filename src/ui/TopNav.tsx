import React, { RefObject, MouseEvent } from 'react';
import { Menu } from 'semantic-ui-react';
import Nav from './Nav';
import './TopNav.css';

type Props = {
  children: {
    topNav: RefObject<HTMLDivElement> | null,
    generateNewArray: (e: MouseEvent) => void
  }
}

function TopNav(props: Props) {
  const { topNav, generateNewArray } = props.children;

  return (
    <div className='ui menu' ref={topNav}>
      <span className='show-for-large'>
        <Nav>{{ generateNewArray }}</Nav>
      </span>

      <Menu.Item>
        {/* <Dropdown placeholder='Select Sorting Algorithm' search selection /> */}
      </Menu.Item>

      <Menu.Item>
        <a href='/sort' className='ui fluid blue submit button'>Sort</a>
      </Menu.Item>
    </div>
  );
}

export default TopNav;