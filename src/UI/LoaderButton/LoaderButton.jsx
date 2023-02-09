import React from "react";
import { Button } from "@mui/material";
import Spinner from "../../UI/spinner/Spinner";

const LoaderButton = ({ loading, label }) => {

    return (
        <Button 
            disabled={loading}
            className="!w-full !py-3 yellow-btn-hover !capitalize !text-base !my-3" 
            type="submit">
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Spinner
                        height={4}
                        width={4}
                        color="fill-yellow-400"
                    />
                </span> */}
                {label}
        </Button>
    );
}

export default LoaderButton;