import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ContextCart } from '../context/Cart';
export default function Product() {
    const { productId } = useParams();
    const getProduct = async () => {
        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products/${productId}`);
        console.log(data);
        return data.product;
    }
    const { data, isLoading } = useQuery('Product', getProduct);
    const { addToCartContext } = useContext(ContextCart);
    const addToCart = async (productId) => {
        const res = await addToCartContext(productId);
        return res;
    }
    if (isLoading) {
        return (
            <p>... loading</p>
        )
    }
    return (
        <div className='products'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4'>
                        {data.subImages.map((img, index) =>
                            <div>
                                <img src={img.secure_url} key={index} className='w-100 h-100' />
                            </div>
                        )}
                    </div>
                    <div className='col-lg-8 mt-5 pt-5'>
                        <h2>{data.name}</h2>
                        <h2 className='d-flex'><p className='me-2'>price is</p>{data.price}</h2>
                        <button className='btn btn-outline-info' onClick={() => addToCart(data._id)}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
