import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const primaryColor = '#e6282b';

const baseFontFamily = ['Helvetica', 'Arial', 'sans-serif'];
const headingFontFamily = ['Roboto Condensed', ...baseFontFamily];
const typographyFontFamily = ['Open Sans', ...baseFontFamily];
const headingTypography: CSSProperties = {
  fontFamily: headingFontFamily.join(','),
  fontWeight: 'bold',
};

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: { borderRadius: '2rem' },
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#fff',
          color: primaryColor,
          transitionProperty: 'all',
        },
      },
    },
    MuiTypography: {
      h1: headingTypography,
      h2: headingTypography,
      h3: headingTypography,
      h4: headingTypography,
      h5: headingTypography,
      h6: headingTypography,
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    fontFamily: typographyFontFamily.join(','),
    fontSize: 12,
  },
});

export default theme;
