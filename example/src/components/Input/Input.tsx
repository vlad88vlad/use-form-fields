import React from 'react';
import './Input.css'

interface IInput {
    label: string,
    value?: string,
    error?: string,
    type?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
                   type = 'text',
                   label,
                   error,
                   value = '',
                   onChange
               }: IInput) => {
    return (
        <div className="Input">
            <input placeholder=" " type={type} value={value} onChange={onChange} />
            <span className="highlight" />
            <div className="Input_error">{error}</div>
            <label>{label}</label>
            <span className="bar" />
        </div>
    );
};

export default Input;
