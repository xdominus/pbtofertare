import React, { useContext } from 'react';
import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Store } from '../../utils/StateProvider';

export default function Navigation() {
    const { state, dispatch } = useContext(Store);
    const {
        selectedItem,
        quote: { quoteItems }
    } = state;
    const drawerWidth = 240;

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

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}
        >
            <Toolbar className="py-1 flex justify-center">
                <img src="/images/logo.webp" alt="" className="h-16 w-fit object-contain" />
            </Toolbar>
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
    );
}
