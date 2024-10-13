import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const itemExists = state.items.find((item) => item.productId === action.payload.productId);
            let updatedItems;

            if (itemExists) {
                updatedItems = state.items.map((item) =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                updatedItems = [...state.items, action.payload];
            }

            return { ...state, items: updatedItems };
        }

        case 'UPDATE_CART_ITEM': {
            const updatedItems = state.items.map((item) =>
                item.productId === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return { ...state, items: updatedItems };
        }

        case 'REMOVE_CART_ITEM': {
            const updatedItems = state.items.filter((item) => item.productId !== action.payload);
            return { ...state, items: updatedItems };
        }

        case 'LOAD_CART': {
            return { ...state, items: action.payload };
        }

        case 'CLEAR_CART': {
            return { ...state, items: [] };
        }

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Load the cart from localStorage when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')); // Use 'cartItems' to match
        if (storedCart) {
            dispatch({ type: 'LOAD_CART', payload: storedCart });
        }
    }, []);

    // Update localStorage whenever the cart state changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.items)); // Change 'cart' to 'cartItems'
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => React.useContext(CartContext);
