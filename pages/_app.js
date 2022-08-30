import '../styles/globals.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { StateProvider } from '../utils/StateProvider';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <StateProvider>
                    <Component {...pageProps} />
                </StateProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp;
