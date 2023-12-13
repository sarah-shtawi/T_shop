import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export function UserContextProvider({ children }) {

    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null)
    const [userOrder, setUserOrder] = useState(null)
    const [Loading, setLoading] = useState(true)
    const getUserData = async () => {
        if (userToken) {
            const { data } = await axios.get('https://ecommerce-node4.vercel.app/user/profile',
                { headers: { Authorization: `Tariq__${userToken}` } })
            setUserData(data.user);
            setLoading(false);
        }
    }
    const getUserOrder = async () => {
        if (userToken) {
            const { data } = await axios.get('https://ecommerce-node4.vercel.app/order',
                { headers: { Authorization: `Tariq__${userToken}` } })
                setLoading(false);
                return data;
        }
    }
    useEffect(() => {
        getUserData();
        getUserOrder();
    }, [userToken])

    return <UserContext.Provider value={{ userToken, setUserToken, userData, getUserData, setUserData, Loading ,getUserOrder}}>
        {children}
    </UserContext.Provider>
}