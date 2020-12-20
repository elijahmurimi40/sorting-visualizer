import React, { MouseEvent } from 'react';
import { Menu } from 'semantic-ui-react';

type Props = {
  children: {
    // eslint-disable-next-line no-unused-vars
    generateNewArray: (e: MouseEvent) => void
  }
}

function Title(props: Props) {
  const { children } = props;
  const { generateNewArray } = children;

  return (
    <>
      <Menu.Item href="/" header>Sorting Visualizer</Menu.Item>
      <a className="item" href="/generate-new-array" onClick={generateNewArray}>Generate New Array</a>
    </>
  );
}

export default Title;
