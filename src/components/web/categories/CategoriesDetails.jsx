import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

export default function CategoriesDetails() {
    const { categoryId } = useParams();
    //console.log(categoryId);

    const getCategoriesDedails = async () => {
        const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products/category/${categoryId}`);
        return data.products;
       /// console.log(data);
    }
    const { data, isLoading } = useQuery('category datails', getCategoriesDedails);
    if (isLoading) {
        return (
            <p>... loading</p>
        )
    }
    return (
        <div className='products'>
            {data?.length?data.map((product) =>
                <div className='product' key={product._id}>
                    <img src={product.mainImage.secure_url} />
                    <h2>{product.name}</h2>
                    <Link to={`/product/${product._id}`}>details</Link>
                </div>
            ):<h2>no product</h2>}
        </div>
    )
}
