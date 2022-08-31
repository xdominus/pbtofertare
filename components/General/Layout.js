import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Store } from '../../utils/StateProvider';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default function Layout({ title, description, pageID, children }) {
    const { state, dispatch } = useContext(Store);
    const {
        selectedItem,
        quote: { quoteItems }
    } = state;

    const handleProduct = (e) => {
        dispatch({
            type: 'SET_PRODUCT',
            payload: e
        });

        dispatch({
            type: 'CLEAR_QUOTE',
            payload: e
        });
    };

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Head>
                <title>{title ? `${title} | PBT Ofertare` : 'PBT Ofertare'}</title>
                {description && <meta name="description" content={description} />}
            </Head>

            <div className={`page-${pageID}`}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" style={{ background: '#ffffff' }} open={open}>
                        <Toolbar>
                            <IconButton
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ color: 'black', mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <img src="/images/logo.webp" className="h-8 object-contain" alt="" />
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        variant="persistent"
                        anchor="left"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                        }}
                        open={open}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </DrawerHeader>

                        <Divider />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                {[
                                    'Plasa Plisse',
                                    'Roleta Textila',
                                    'Roleta Zebra',
                                    'Jaluzele Verticale',
                                    'Panel Ornamental',
                                    'Rulou de Folie Necasetat',
                                    'Rulou de Folie Casetat',
                                    'Folie cu Capse si Bride'
                                ].map((e, i) => (
                                    <React.Fragment key={i}>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                selected={selectedItem === e ? true : false}
                                                onClick={() => handleProduct(e)}
                                            >
                                                <ListItemText primary={e} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </Drawer>

                    <Main open={open}>
                        <DrawerHeader />
                        <div>{children}</div>
                    </Main>
                </Box>
            </div>
        </React.Fragment>
    );
}
