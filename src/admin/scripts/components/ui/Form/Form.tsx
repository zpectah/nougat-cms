import React from 'react';

type FormBaseProps = {
    children?: React.ReactNode,
}
export type FormProps = React.HTMLProps<HTMLFormElement> & React.HTMLAttributes<HTMLFormElement> & FormBaseProps

const Form: React.FC<FormProps> = (props) => {
    const {
        children,
        ...rest
    } = props;

    return (
        <form
            {...rest}
        >
            {children}
        </form>
    );
};

export default Form;
