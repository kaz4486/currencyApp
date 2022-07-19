import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  const testCases = [100, 2, 999, 12345, 1.55];
  for (const test of testCases) {
    it('should render proper info about conversion when PLN->USD', () => {
      render(<ResultBox from='PLN' to='USD' amount={test} />);

      const mainDiv = screen.getByTestId('main-div');

      expect(mainDiv).toHaveTextContent(
        `PLN ${test
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} = $${(test / 3.5)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      );
    });
  }
  for (const test of testCases) {
    it('should render proper info about conversion when USD->PLN', () => {
      render(<ResultBox from='USD' to='PLN' amount={test} />);

      const mainDiv = screen.getByTestId('main-div');

      expect(mainDiv).toHaveTextContent(
        `$${test
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} = PLN ${Math.floor(
          (test * 3.5).toFixed(2)
        )
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      );
    });
  }
});
