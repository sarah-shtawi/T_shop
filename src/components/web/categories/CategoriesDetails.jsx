import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../loading/Loader';

export default function CategoriesDetails() {
    const { categoryId } = useParams();
    const [loading, setLoading] = useState(false);

    const getCategoriesDedails = async () => {
        setLoading(true);
        const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products/category/${categoryId}`);
        setLoading(false);
        return data.products;
    }
    const { data } = useQuery('category datails', getCategoriesDedails);
    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <div className='container vh-100 '>
            <div className=' d-flex justify-content-center align-items-center pt-5 mt-3'>
                {data?.length ? data.map((product) =>
                    <div className='w-100 text-center allProducts p-5 me-2'>
                        <img key={product._id} src={product.mainImage.secure_url} className='w-75 h-75 border rounded img-fluid' />
                        <p className='fw-bolder mt-2'>{product.name}</p>
                        <Link to={`/product/${product._id}`} className='rounded Details'>Details</Link>
                    </div>
                    ) : <h2>no product</h2>}
            </div>
        </div>
    )
}
