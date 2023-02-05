import React, { useState } from "react";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = (props) => {
    const [ showPassword, setShowPassword ] = useState(false);

    const showPasswordFn = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <OutlinedInput
            {...props}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            className="!w-full mb-4"
            placeholder="******"
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={showPasswordFn}
                        edge="end"
                    >
                        {showPassword ? (
                        <AiFillEye />
                        ) : (
                        <AiFillEyeInvisible />
                        )}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
}

export default PasswordInput;