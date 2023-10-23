import { ChangeEvent, forwardRef } from 'react';
import './../../css/components/action-components/user-input.css';


interface UserInputProps {
    overrideClass?: string;
    placeHolderText: string;
    type: React.HTMLInputTypeAttribute;
    value?: any;
    changeHandlerCallback: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const UserInput = forwardRef<HTMLInputElement, UserInputProps>(
    (props, ref) => {
        const {
            overrideClass,
            placeHolderText,
            type,
            value,
            changeHandlerCallback,
            onKeyDown
        } = props;


        return (
            <input
                ref={ref}
                className={`user-input-field ${overrideClass}`}
                placeholder={placeHolderText}
                type={type}
                value={value}
                onChange={(e) => changeHandlerCallback(e)}
                onKeyDown={(e) => onKeyDown?.(e)}
            />
        );
    }
);

export default UserInput;
