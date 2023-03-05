import React from 'react';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowDow from "../icons/ArrowDown";

const AccordionSummary = (props) => (
    <MuiAccordionSummary expandIcon={<ArrowDow />} {...props} />
);

export default AccordionSummary;
