import React, { MouseEvent, RefObject } from 'react';
import Nav from './Nav';

type Props = {
  children: {
    bottomNav: RefObject<HTMLDivElement> | null,
    // eslint-disable-next-line no-unused-vars
    generateNewArray: (e: MouseEvent) => void
  }
}

function BottomNav(props: Props) {
  const { children } = props;
  const { bottomNav, generateNewArray } = children;

  return (
    <div className="ui bottom fixed two item menu show-for-medium" ref={bottomNav}>
      <Nav>{{ generateNewArray }}</Nav>
    </div>
  );
}

export default BottomNav;
