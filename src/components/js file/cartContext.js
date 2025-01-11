import  { createContext, useState, useContext} from 'react';

//create context
const cartContext = createContext();

//custom hook for cart
export const useCart = () => useContext(cartContext);

export const cartProvider = ({ children }) => {
    const [cart, setCart] = useState;

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id); 
        if (existingItem) {
            setCart(cart.map((cartItem) => 
                cartItem.id === item.id ? {...cartItem, quantity:cartItem.quantity + 1}
                : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }])
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCart(cart.map((item) => item .id === id ? 
         {...item, quantity: Math.max(1, item.quantity + amount) }
         : item
        ))
    };


    return (
        <cartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </cartContext.Provider>
    )
}