import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Grid from './index';

describe('<Grid />', () => {
    it('should render a grid-container', () => {
        const { container } = render(<Grid />);
        expect(container.getElementsByClassName("grid-container").length).toBe(1);
    });

    it('should render a grid', () => {
      const { container } = render(<Grid />);
      expect(container.getElementsByClassName("grid").length).toBe(1);
    });
});
