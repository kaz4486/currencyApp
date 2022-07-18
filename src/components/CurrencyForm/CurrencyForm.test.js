import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    // set test values to fields

    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      const action = jest.fn();
      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText('Convert');

      // find "amount" input
      const amountInput = screen.getByTestId('amount');

      // find "from" select
      const fromSelect = screen.getByTestId('from');

      // find "to" select
      const toSelect = screen.getByTestId('to');

      userEvent.type(amountInput, testObj.amount);
      userEvent.selectOptions(fromSelect, testObj.from);
      userEvent.selectOptions(toSelect, testObj.to);

      userEvent.click(submitButton);

      expect(action).toHaveBeenCalledTimes(1);

      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testObj.amount),
        from: testObj.from,
        to: testObj.to,
      });
      // unmount component
      cleanup();
    }

    // simulate user click on "convert" button
    //userEvent.click(submitButton);

    // check if action callback was called once
    /*expect(action).toHaveBeenCalledTimes(1);
    
    expect(action).toHaveBeenCalledWith()*/

    /*expect(action).toHaveBeenCalledWith({
      amount: 100,
      from: 'PLN',
      to: 'USD',
    });*/
  });
});
