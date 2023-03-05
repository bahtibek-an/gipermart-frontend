import React from 'react';
import MuiAccordion from '@mui/material/Accordion';

const Accordion = (props) => (
    <MuiAccordion
        disableGutters
        elevation={0}
        sx={{
            boxShadow: 'none',
            ['&.Mui-expanded:before']: {
                opacity: 1,
            },
        }}
        {...props}
    />
);

export default Accordion;
