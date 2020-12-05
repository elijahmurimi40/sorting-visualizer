import React, { MouseEvent } from 'react';
import { Menu } from 'semantic-ui-react';

type Props = {
  children: {
    generateNewArray: (e: MouseEvent) => void
  }
}

function Title(props: Props) {
  const { generateNewArray } = props.children;

  return (
    <React.Fragment>
      <Menu.Item href='/' header>Sorting Visualizer</Menu.Item>
      <a className='item' href='/generate-new-array' onClick={generateNewArray}>Generate New Array</a>
    </React.Fragment>
  );
}

export default Title;