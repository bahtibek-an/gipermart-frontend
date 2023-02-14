import { InputLabel, MenuItem, Select, styled } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

const colors = {
    primary: {
      default: '#FEEE00',
      dark: '#FFCE39',
      hover:'#E44542',
    },
    white: '#FFFFFF',
    red: {
      default: '#E44542',
      light: '#FF888C',
      badge: '#EB133D',
    },
    green: {
      default: '#B5EE6F',
    },
    black: '#333333',
    grey: {
      default: '#999999',
      light: '#F5F5F6',
      lighter: '#EAEAEA',
      input: '#534343',
      brand: '#F8F8F8',
      controller: '#EDEDED',
      darc:'#808080',
      dlight:'#d9d9d9'
    },
};
  
export const StyledSelect = styled(Select)`
  label + & {
    margin-top: ${(props) => props.theme.spacing(3)};
  }
  label & {
    font-size: 20px;
  }

  .MuiSelect-select {
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${colors.white};
  }

  .MuiSelect-icon {
    margin-right: 12px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #ecf1f4;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-width: 1px;
  }
`;

export const StyledHelperText = styled(FormHelperText)`
  margin-left: 0;
`;

export const StyledMenuItem = styled(MenuItem)`
  padding-left: 24px;
`;

export const StyledLabel = styled(InputLabel)`
  color: ${(props) => props.theme.palette.text.primary};
  font-weight: 500;
  transform: translate(0, -1.5px) scale(0.75);
`;
