import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('Component ResultBox', () => {

    // Ćwiczenie 1
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    // Ćwiczenie 2
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
    });

    // Ćwiczenie 3  
    const testCases = [
        { from: 'PLN', to: 'USD', amount: 100, expectedText: 'PLN 100.00 = $28.57' },
        { from: 'PLN', to: 'USD', amount: 200, expectedText: 'PLN 200.00 = $57.14' },
        { from: 'PLN', to: 'USD', amount: 50, expectedText: 'PLN 50.00 = $14.29' },
    ];
    testCases.forEach(({ from, to, amount, expectedText }) => {
        it(`should render proper info about conversion from ${from} to ${to}`, () => {
            render(<ResultBox from={from} to={to} amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(expectedText);
        });
    });

    // Ćwiczenie 4
    const testCasesUSDToPLN = [
        { from: 'USD', to: 'PLN', amount: 50, expectedText: '$50.00 = PLN 175.00' },
        { from: 'USD', to: 'PLN', amount: 100, expectedText: '$100.00 = PLN 350.00' },
        { from: 'USD', to: 'PLN', amount: 200, expectedText: '$200.00 = PLN 700.00' },
    ];
    testCasesUSDToPLN.forEach(({ from, to, amount, expectedText }) => {
        it(`should render proper info about conversion from ${from} to ${to}`, () => {
            render(<ResultBox from={from} to={to} amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(expectedText);
        });
    });

    // Ćwiczenie 5
    it('should render equal values when from equals to', () => {
        render(<ResultBox from="PLN" to="PLN" amount={123} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
    });

    // Zadanie: negatywne przypadki
    it('should render "Wrong value..." for negative amount', () => {
      render(<ResultBox from="PLN" to="USD" amount={-50} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
    });
});