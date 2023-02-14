import React from 'react';
import FormControl from '@mui/material/FormControl';
import {
  StyledSelect,
  StyledMenuItem,
  StyledLabel,
  StyledHelperText,
} from './select.styles';

const Select = ({
  label,
  helperText,
  sx,
  fullWidth,
  ...props
}) => (
  <FormControl error={props.error} fullWidth={fullWidth} sx={sx}>
    {label && <StyledLabel id="Some-i   d">{label}</StyledLabel>}

    <StyledSelect
      MenuProps={{
        PaperProps: {
          elevation: 2,
        },
      }}
      labelId="Some-id"
      {...props}
    >
      {props.children}
    </StyledSelect>
    {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
  </FormControl>
);

Select.Item = StyledMenuItem;

export default Select;
