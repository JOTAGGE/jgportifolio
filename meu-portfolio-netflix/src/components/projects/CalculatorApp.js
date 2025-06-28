// src/components/projects/CalculatorApp.js

import React, { useState } from 'react';

const CalculatorApp = () => {
    const [input, setInput] = useState('0');
    const [previousNumber, setPreviousNumber] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForNewOperand, setWaitingForNewOperand] = useState(false);

    const handleDigitClick = (digit) => {
        if (waitingForNewOperand) {
            setInput(String(digit));
            setWaitingForNewOperand(false);
        } else {
            setInput(input === '0' ? String(digit) : input + digit);
        }
    };

    const handleDecimalClick = () => {
        if (!input.includes('.')) {
            setInput(input + '.');
        }
    };

    const handleClearClick = () => {
        setInput('0');
        setPreviousNumber(null);
        setOperator(null);
        setWaitingForNewOperand(false);
    };

    const handleOperatorClick = (nextOperator) => {
        const inputValue = parseFloat(input);

        if (previousNumber === null) {
            setPreviousNumber(inputValue);
        } else if (operator) {
            const result = performCalculation[operator](previousNumber, inputValue);
            setInput(String(result));
            setPreviousNumber(result);
        }

        setWaitingForNewOperand(true);
        setOperator(nextOperator);
    };

    const handleEqualsClick = () => {
        const inputValue = parseFloat(input);

        if (previousNumber === null || operator === null) {
            return;
        }

        const result = performCalculation[operator](previousNumber, inputValue);
        setInput(String(result));
        setPreviousNumber(null);
        setOperator(null);
        setWaitingForNewOperand(false);
    };

    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    };

    return (
        <div className="flex justify-center items-center p-4 bg-gray-900">
            <div className="calculator-grid bg-gray-800 p-6 rounded-lg shadow-xl w-72">
                <div className="output bg-gray-700 text-white text-right p-4 mb-4 rounded text-2xl font-mono">
                    {input}
                </div>
                <div className="buttons grid grid-cols-4 gap-2">
                    {['7', '8', '9', '/'].map(item => (
                        <button key={item} className="btn bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded text-xl" onClick={() => (/[0-9]/.test(item) ? handleDigitClick(item) : handleOperatorClick(item))}>
                            {item}
                        </button>
                    ))}
                    {['4', '5', '6', '*'].map(item => (
                        <button key={item} className="btn bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded text-xl" onClick={() => (/[0-9]/.test(item) ? handleDigitClick(item) : handleOperatorClick(item))}>
                            {item}
                        </button>
                    ))}
                    {['1', '2', '3', '-'].map(item => (
                        <button key={item} className="btn bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded text-xl" onClick={() => (/[0-9]/.test(item) ? handleDigitClick(item) : handleOperatorClick(item))}>
                            {item}
                        </button>
                    ))}
                    <button className="btn bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded text-xl" onClick={() => handleDigitClick(0)}>
                        0
                    </button>
                    <button className="btn bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded text-xl" onClick={handleDecimalClick}>
                        .
                    </button>
                    <button className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded text-xl" onClick={handleClearClick}>
                        C
                    </button>
                    <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded text-xl" onClick={handleEqualsClick}>
                        =
                    </button>
                    <button className="btn bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded text-xl" onClick={() => handleOperatorClick('+')}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalculatorApp;
