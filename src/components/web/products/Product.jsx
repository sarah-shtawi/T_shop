import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ContextCart } from '../context/Cart';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import './Products.css';
import { Pagination } from 'antd';
import Loader from '../../loading/Loader';
export default function Product() {
    const { productId } = useParams();
    let [Loading, setLoading] = useState(false);
    let [Data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const [totle, setTotle] = useState(1);
    const IndexOfLastPage = currentPage * postPerPage;
    const IndexOfFirstPage = IndexOfLastPage - postPerPage;


    const initialValues = {
        comment: '',
        rating: '',
    };
    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('userToken');
            const { data } = await axios.post(`https://ecommerce-node4.vercel.app/products/${productId}/review`, values,
                { headers: { Authorization: `Tariq__${token}` } });
            if (data.message == 'success') {
                toast.success('your comment added succesfully', {
                    position: "bottom-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setLoading(false);
            };
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
    });
    const inputs = [
        {
            id: 'your comment',
            type: 'comment',
            placeHolder: 'Add Comment',
            name: 'comment',
            value: formik.values.comment,
        },
        {
            id: 'rating',
            type: 'rating',
            placeHolder: 'rating',
            name: 'rating',
            value: formik.values.rating,
        },
    ]
    const renderInput = inputs.map((input, index) =>
        <Input type={input.type}
            id={input.id}
            title={input.title}
            name={input.name}
            value={input.value}
            ChangeData={formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            placeHolder={input.placeHolder}
            key={index} />
    );

    const getProduct = async () => {
        setLoading(true);
        const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products/${productId}`);
        setTotle(data.product.reviews.length);
        setData(data.product);
        setLoading(false);
    }
    const DataReviews = Data?.reviews?.slice(IndexOfFirstPage, IndexOfLastPage)
    const { addToCartContext } = useContext(ContextCart);
    const addToCart = async (productId) => {
        const res = await addToCartContext(productId);
        return res;
    }
    useEffect ( ()=>{
        getProduct();
    },[])
    if (Loading) {
        return (
            <Loader/>
        )
    }
    return (
        <div className='products'>
            <div className='container'>
                <div className='d-flex'>

                    <div className='w-25 imgs'>
                        {Data?.subImages?.map((img, index) =>
                            <div key={index} className='w-100'>
                                <img src={img.secure_url} className='w-100 h-25 rounded border img-fluid ' />
                            </div>
                        )}
                    </div>

                    <div className='ms-5 w-75'>
                        <h2 className='fs-3'>{Data?.name}</h2>
                        <div className=''>
                            <h2 className='d-flex'>Price:${Data?.price}</h2>
                            <p className='w-100 text-black fw-medium'>Description: {Data?.description}</p>
                            <button className='btn ms-3 h-25 w-25 mb-3 text-white fw-medium AddCart' onClick={() => addToCart(Data?._id)}> Add To Cart <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512" className='ms-3'><path fill="#f7f7f7" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></button>
                        </div>
                        <div>
                            <div className="reviews w-100 p-3">
                                <h2 className='title text-decoration-underline fs-2 fw-bolder'>People Reviews</h2>
                                {DataReviews ? DataReviews.map((review, index) =>
                                    <div key={index} className='border '>
                                        <p className='fw-bold fs-4'>{review.createdBy.userName}:{review.comment}</p>
                                        <div className='d-flex'>
                                            <p className='me-1 Rating fw-bold '>Rating:</p>
                                            <div>
                                                {Array.from({ length: review.rating }).map(() =>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#656161" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>)}
                                            </div>
                                            <div>
                                                {Array.from({ length: 5 - review.rating }).map(() =>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#656161" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>)}
                                            </div>
                                        </div>
                                    </div>
                                ) : <p>No Reviews</p>}
                                <Pagination onChange={(value) => setCurrentPage(value)}
                                    pageSize={postPerPage}
                                    total={totle}
                                    current={currentPage}
                                    className='w-100 text-center mt-2'
                                />
                                <form className='p-4   mt-4' onSubmit={formik.handleSubmit} >
                                    {renderInput}
                                    <button type='sumbit' disabled={!formik.isValid} className='btn AddCart text-white fw-medium w-25 m-auto mt-2'>ADD</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

