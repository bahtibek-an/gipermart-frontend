import React, {useState} from 'react';
import {PhoneInput} from "react-international-phone";

const PhoneNumberInput = (props) => {
    const [ value, setValue ] = useState('');
    
    const handleChange = (phone) => {
        if(props.withoutPlus) {
            const newValue = phone
            setValue(newValue);
            if (props.onChange) {
                props.onChange(newValue.replace(/[\s+]/g, ''));
            }
            return;
        }
        const newValue = phone
        setValue(newValue);
        if (props.onChange) {
            props.onChange(newValue.replace(/\s/g, ''));
        }
    }

    const inputStyle = {
        height: "56px",
        fontSize: "16px",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        borderRadius: "4px"
    }

    return (
        <PhoneInput
            inputClassName="w-full"
            inputStyle={props.inputStyle || inputStyle}
            value={value}
            hideDropdown={true}
            countrySelectorStyleProps={{
                style: {
                    display: "none"
                }
            }}
            onChange={handleChange}
            defaultCountry="uz"
            className={props.className}
            inputProps={{ onKeyDown: props.onKeyDown }}
        />
    )
};

export default PhoneNumberInput;