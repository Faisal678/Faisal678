import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setGoal, reset } from '../redux/goals/goalSlice'
import Spinner from './Spinner'

const SetGoal = () => {

    const schema = yup.object().shape({
        name: yup.string().required("Name is required")
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        dispatch(setGoal(data))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success(message)
        }
        dispatch(reset())
    }, [isLoading, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='mt-3'>
            <div className='card col-6 offset-3'>
                <div className='card-body'>
                    <h3 className='text-info'>Set your Goal</h3>
                    <form className='mt-4 pb-2' onSubmit={handleSubmit(onSubmit)} method='Post'>
                        <div className='row'>
                            <div className='col-3'>
                                <label htmlFor='name'>Name: </label>
                            </div>
                            <div className='col-9'>
                                <input className='form-control' type='text' id='name' {...register("name")} />
                            </div>
                            <span className='text-danger'>{errors.name?.message}</span>
                        </div>
                        <br />
                        <Button variant="outline-success btn-lg" type='submit'>Save</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SetGoal