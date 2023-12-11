import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'
export const ContextCart = createContext(null);

export function ContextCartProvider({ children }) {
    let [count, setCount] = useState(0);

    const addToCartContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`https://ecommerce-node4.vercel.app/cart`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } })
            if (data.message == "success") {
                toast.success('Product added succesfully ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            setCount(++count)
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getCartContext = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
                { headers: { Authorization: `Tariq__${token}` } }
            );
            setCount(data.count)
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const removeItemContext = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.patch(`https://ecommerce-node4.vercel.app/cart/removeItem`, { productId },
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
   
    useEffect(() => {
        clearCartContext();
    }, [])
    return <ContextCart.Provider value={{ addToCartContext, getCartContext, removeItemContext, count, setCount,clearCartContext }}>
        {children}
    </ContextCart.Provider>;
}