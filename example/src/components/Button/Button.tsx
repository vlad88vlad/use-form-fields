import React from 'react';
import './Button.css'

interface IButton {
    children: React.ReactChild,
    type?: "button" | "submit" | "reset"
}

const Button = ({children, type, ...props}: IButton) => {
    return (
        <button type={type} className="Button" {...props}>
            {children}
        </button>
    );
};

export default Button;
