import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#006975',
            light: '#006975',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#feb925',
            dark: '#feb925',
            contrastText: '#ffffff'
        },
        danger: {
            main: '#d40000',
            dark: '#d40000',
            contrastText: '#ffffff'
        }
    }
});
