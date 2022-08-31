import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    selectedItem: '',
    quote: {
        quoteItems: []
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_PRODUCT': {
            return { ...state, selectedItem: action.payload };
        }

        case 'CLEAR_QUOTE': {
            return { ...state, quote: { quoteItems: [] } };
        }

        case 'ADD_PRODUCT': {
            const newItem = action.payload;
            const quoteItems = [...state.quote.quoteItems, newItem];
            return { ...state, quote: { quoteItems } };
        }

        case 'UPDATE_PRODUCT': {
            const updatedProduct = state.quote.quoteItems.map((items) => {
                if (items.key === action.payload.key) {
                    return action.payload;
                }
                return items;
            });
            console.log(updatedProduct);
            return { ...state, quote: { quoteItems: updatedProduct } };
        }

        case 'REMOVE_ITEM':
            const quoteItems = state.quote.quoteItems.filter((item) => item.key !== action.payload);
            return { ...state, quote: { ...state.quote, quoteItems } };

        default:
            return state;
    }
}

export function StateProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
