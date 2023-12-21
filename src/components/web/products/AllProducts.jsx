import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../../loading/Loader';
export default function AllProducts() {
    let [data, setData] = useState([]);
    let [Loading, setLoading] = useState(true);
    let [valueSearch, setValueSearch] = useState('');
    let [sortValue, setSortValue] = useState('');
    let [ValueMin, setValueMin] = useState('');
    let [ValueMax, setValueMax] = useState('');
    let [PageNumber, setPageNumber] = useState(1);
    const SortOption = ["name", '-name', 'price', '-price', 'discount', '-discount'];
    const Pages = [];
    for (let i = 1; i <= PageNumber; i++) {
        Pages.push(i);
    }
    const getAllProducts = async (page) => {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`)
        setPageNumber(data.total / data.page)
        setData(data.products);
        setLoading(false);
        return data;
    }
    const handelSearch = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?search=${valueSearch}`)
        setData(data.products);
        setValueSearch('');
        setLoading(false);
    }
    const handleSort = async (e) => {
        setLoading(true);
        let valueSort = e.target.value;
        setSortValue(valueSort);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?sort=${valueSort}`)
        setData(data.products);
        setLoading(false);
    }
    const handelFilter = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?price[lt]=${ValueMin}&price[gt]=${ValueMax}`);
        setData(data.products);
        setLoading(false);
    }
    const handelReset = () => {
        setLoading(true);
        getAllProducts(1);
        setValueSearch('');
        setSortValue('');
        setValueMin('');
        setValueMax('');
        setLoading(false);
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    if (Loading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <div className='container d-flex mt-5 p-4'>
                <form className='w-25 d-flex h-50 '>
                    <input type='text' className='form-control w-50 me-1' placeholder='search' onChange={(e) => setValueSearch(e.target.value)} />
                    <button type="button" onClick={handelSearch} className="btn AddCart text-white fw-medium w-25">search</button>
                </form>
                <form className='w-50  d-flex h-50 ' >
                    <input type='text' className='form-control w-25 me-1' placeholder='minPrice' onChange={(e) => setValueMin(e.target.value)} />
                    <input type='text' className='form-control w-25 me-1' placeholder='maxPrice' onChange={(e) => setValueMax(e.target.value)} />
                    <buuton type='button' onClick={handelFilter} className=" btn AddCart text-white fw-medium w-25">Filter</buuton>
                </form>
                <select onChange={handleSort} value={sortValue} className='form-select w-25 mb-3 select fw-medium ' >
                    <option>Sort By</option>
                    {SortOption.map((option, index) =>
                        <option key={index} value={option}>{option}</option>
                    )}
                </select>
            </div>

            <div className='container d-flex'>
                {data ? data.map((product, index) =>
                    <div className='w-100 allProducts p-2 m-2  text-center' key={index}>
                        <img src={product.mainImage.secure_url} className='w-75 h-50 p-2 rounded' />
                        <div className='mt-2 nameProduct'>
                            <p className='fs-5 fw-bolder'>{product.name}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center h-25 '>
                            <Link to={`/product/${product._id}`} className=' rounded w-50 Details ms-2 mt-3'>Details</Link>
                            <div className='d-flex'>
                                <div>
                                    {Array.from({ length:product.avgRating }).map(() =>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#656161" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>)}
                                </div>
                                <div>
                                    {Array.from({ length: 5 - product.avgRating }).map(() =>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#656161" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <p>No Products</p>}
            </div>
            <nav aria-label="Page navigation example ">
                <ul className="pagination d-flex justify-content-center align-item-center">
                    {
                        Pages.map((page, index) =>
                            <nav key={index}>
                                <li className="page-item ">
                                    <Link onClick={() => getAllProducts({ page }.page)} className="page-link text-dark" >{page}</Link>
                                </li>
                            </nav>
                        )
                    }
                </ul>
            </nav>

            <div className='container text-end'>
                <button type="button" onClick={handelReset} className="btn AddCart text-white fw-medium w-25">Reset</button>
            </div>

        </>
    )
}
