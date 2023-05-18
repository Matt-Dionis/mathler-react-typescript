import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Key from './index';

describe('<Key />', () => {
    it('should render a button', () => {
        const { container } = render(
          <Key
            exactMatch={false}
            keyType="1"
            looseMatch={false}
            noMatch={false}
          />);
        expect(container.getElementsByClassName("button").length).toBe(1);
    });
});
