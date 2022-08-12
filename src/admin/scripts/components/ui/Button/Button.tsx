import React from 'react';

type ButtonBaseProps = {
    children?: React.ReactNode,
}
export type ButtonProps = ButtonBaseProps;

const Button = (props: ButtonProps) => {
    const {
        children,
    } = props;

    return (
        <button>
            {children}
        </button>
    );
};

export default Button;
