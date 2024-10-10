import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#d220f3',

  '&.Mui-checked': {
    color: theme.accentColors.pink01,
  },
}));
