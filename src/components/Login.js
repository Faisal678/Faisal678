import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../redux/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

const Login = () => {

    const schema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='container mt-4'>
            <div className='card col-6 offset-3'>
                <div className='card-body'>
                    <h3 className='text-info'>Sign in to your account</h3>
                    <form className='mt-4 pb-2' onSubmit={handleSubmit(onSubmit)} method='Post'>
                        <div className='row'>
                            <div className='col-3'>
                                <label htmlFor='email'>Email: </label>
                            </div>
                            <div className='col-9'>
                                <input className='form-control' type='email' id='email' {...register("email")} />
                            </div>
                            <span className='text-danger'>{errors.email?.message}</span>
                        </div>
                        <div className='row pt-3'>
                            <div className='col-3'>
                                <label htmlFor='password'>Password: </label>
                            </div>
                            <div className='col-9'>
                                <input className='form-control' type='password' id='password' {...register("password")} />
                            </div>
                            <span className='text-danger'>{errors.password?.message}</span>
                        </div>
                        <br />
                        <Button variant="outline-success btn-lg" type='submit'>Save</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login