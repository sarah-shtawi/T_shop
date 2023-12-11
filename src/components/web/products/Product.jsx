import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import { ContextCart } from '../context/Cart';
export default function Product() {
    const { productId } = useParams();
    const getProduct = async () => {
        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products/${productId}`);
        return data.product;
    }
    const { data, isLoading } = useQuery('Product', getProduct);
    const {addToCartContext} = useContext(ContextCart);
    const addToCart = async (productId)=>{
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
                            <React.Fragment key={index}>
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: img.secure_url
                                    },
                                    largeImage: {
                                        src: img.secure_url,
                                        width: 1200,
                                        height: 1800
                                    }, isHintEnabled: true,
                                    enlargedImageContainerDimensions: {
                                        width: 900,
                                        height: 900,
                                    }, enlargedImagePosition: 'over'
                                }} />
                            </React.Fragment>
                        )}
                    </div>
                    <div className='col-lg-8 mt-5 pt-5'>
                        <h2>{data.name}</h2>
                        <h2 className='d-flex'><p className='me-2'>price is</p>{data.price}</h2>
                        <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
