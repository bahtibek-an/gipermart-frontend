import React from 'react';
import FormControl from '@mui/material/FormControl';
import {
  StyledSelect,
  StyledMenuItem,
  StyledLabel,
  StyledHelperText,
} from './select.styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
      IconComponent={KeyboardArrowDownIcon}
      {...props}
    >
      {props.children}
    </StyledSelect>
    {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
  </FormControl>
);

Select.Item = StyledMenuItem;

export default Select;
