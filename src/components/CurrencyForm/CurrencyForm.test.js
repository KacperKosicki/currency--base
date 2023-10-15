import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

const testCases = [
  { amount: '100', from: 'PLN', to: 'USD' },
  { amount: '20', from: 'USD', to: 'PLN' },
  { amount: '200', from: 'PLN', to: 'USD' },
  { amount: '345', from: 'USD', to: 'PLN' },
  { amount: '-345', from: 'USD', to: 'PLN' }, //testowy DODATKOWY
  { amount: '0', from: 'PLN', to: 'USD' }, //testowy DODATKOWY
];

describe('Component CurrencyForm', () => {
  afterEach(() => {
    cleanup();
  });

  testCases.forEach(({ amount, from, to }) => {
    it(`should run action callback with proper data for amount: ${amount}, from: ${from}, to: ${to}`, () => {
      const action = jest.fn();
      
      // render component
      render(<CurrencyForm action={action} />);
      
      // find elements
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');
      const submitButton = screen.getByText('Convert');
      
      // set test values to fields
      userEvent.type(amountField, amount);
      userEvent.selectOptions(fromField, from);
      userEvent.selectOptions(toField, to);
      
      // simulate user click on "convert" button
      userEvent.click(submitButton);
      
      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: parseInt(amount), from, to });
    });
  });
});