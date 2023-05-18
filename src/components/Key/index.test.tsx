import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import Key from './index';
import GameProvider from '../../providers/game';

describe('<Key />', () => {
  it('should render one button', () => {
    const { container } = render(
      <Key
        exactMatch={false}
        keyType="1"
        looseMatch={false}
        noMatch={false}
      />
    );
    expect(container.getElementsByClassName("button").length).toBe(1);
  });

  it('should render exact-match class for an exact match', () => {
    const { container } = render(
      <Key
        exactMatch={true}
        keyType="1"
        looseMatch={false}
        noMatch={false}
      />
    );
    expect(container.getElementsByClassName("exact-match").length).toBe(1);
  });

  it('should render loose-match class for a loose match', () => {
    const { container } = render(
      <Key
        exactMatch={false}
        keyType="1"
        looseMatch={true}
        noMatch={false}
      />
    );
    expect(container.getElementsByClassName("loose-match").length).toBe(1);
  });

  it('should render no-match class for no match', () => {
    const { container } = render(
      <Key
        exactMatch={false}
        keyType="1"
        looseMatch={false}
        noMatch={true}
      />
    );
    expect(container.getElementsByClassName("no-match").length).toBe(1);
  });

  // it('onSelectKey handler for delete', () => {
  //   const { container } = render(
  //     <GameProvider>
  //       <Key
  //         exactMatch={false}
  //         keyType="delete"
  //         looseMatch={false}
  //         noMatch={true}
  //       />
  //     </GameProvider>
  //   );
 
  //   const button = container.getElementsByClassName("button")[0];
  //   fireEvent.click(button);
 
  //   expect(screen.getByTestId("counter-text")).toHaveTextContent("1");
  // });
});
