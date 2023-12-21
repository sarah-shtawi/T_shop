import React, { useContext, useState } from 'react'
import Input from '../../../pages/Input.jsx'
import { useFormik } from 'formik'
import { LoginSchema } from '../../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/User.jsx'
import './Login.css'
import Loader from '../../../loading/Loader.jsx'
export default function Login() {
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };
    let { userToken, setUserToken } = useContext(UserContext);
    if (userToken) {
        navigate('/home');
    }
    const onSubmit = async users => {
        setLoading(true);
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`, users);
        if (data.message == 'success') {
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            toast.success('login succesfully ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/home')
            setLoading(false);
        }
    }
    
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: LoginSchema,
    });
    const inputs = [
        {
            id: 'user email',
            type: 'email',
            title: 'Email',
            name: 'email',
            value: formik.values.email,
        },
        {
            id: 'user password',
            type: 'password',
            title: 'User Password',
            name: 'password',
            value: formik.values.password,
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
            key={index} />
    );
    if(loading){
        return (
            <Loader/>
        )
    }
    return (
        <>
            <div className='container '>
                <h2 className='text-center mt-5 mb-0 fw-bolder'> SignIn </h2>
                <form className='p-4 w-50 m-auto mt-4 form' onSubmit={formik.handleSubmit} >
                    {renderInput}
                    <div className='d-flex justify-content-between'>
                        <button type='submit' disabled={!formik.isValid} className="mt-3 p-2 w-25 text-white fw-medium send-data" >Login</button>
                        <Link to='/sendCode' className='mt-4 text-black fw-bold'>Forget Password</Link>
                    </div>
                </form>

            </div>
        </>
    )
}
