import { useState } from 'react';



const useInput = (type) => {

    const [inputValue, setInputValue] = useState('');
    const [blur, setBlur] = useState(false);

    const validation = () => {
        if(type === 'name') {
            return inputValue.trim() !== '';
        }
        if(type === 'street') {
            return inputValue.trim() !== '';
        }
        if(type === 'postal') {
            return inputValue.trim().length >= 5 && inputValue.trim().length <= 5;
        }
        if(type === 'city') {
            if(inputValue !== '') {
                return inputValue[0].trim() === inputValue[0].trim().toUpperCase();
            }   
        }
    }

    const isInputValid = validation();
    const isInputValidAndBlur = !isInputValid && blur;

    const inputHandler = (event) => {
        setInputValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setBlur(true);
    }

    return {
        inputValue,
        isInputValid,
        isInputValidAndBlur,
        inputHandler,
        inputBlurHandler
    };
}


export default useInput;