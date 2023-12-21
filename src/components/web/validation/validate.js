import * as yup from 'yup';

export const registerSchema = yup.object({
    userName:yup.string().required("user name is required").min(3,'user name must be 3 characters').max(30,'user name must be max is 30 characters'),
    email:yup.string().required('email is required').email(),
    password:yup.string().required('password is required').min(3,'password must be 3 characters').max(30,'password must be max is 30 characters'),
})

export const LoginSchema = yup.object({
    email:yup.string().required('email is required').email(),
    password:yup.string().required('password is required').min(3,'password must be 3 characters').max(30,'password must be max is 30 characters'),
})
export const ForgetPasswordSchema = yup.object({
    email:yup.string().required('email is required').email(),  
    password:yup.string().required('password is required').min(3,'password must be 3 characters').max(30,'password must be max is 30 characters'),
    code:yup.string().required('code is required').length(4,'code must be 4 characters'),
})
export const OrderSchema = yup.object({
    address:yup.string().required('address is required'),  
    phone:yup.string().required('phone is required'),
})
export const SendCodeSchema = yup.object({
    email:yup.string().required('email is required').email(),
})
