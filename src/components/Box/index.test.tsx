import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Box from './index';

describe('<Box />', () => {
    it('should render a cell', () => {
        const { container } = render(<Box columnIndex={0} rowIndex={0} />);
        expect(container.getElementsByClassName("cell").length).toBe(1);
    });
});
