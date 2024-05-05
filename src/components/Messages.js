import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap'
import io from 'socket.io-client'

const Messages = () => {

    const socket = io.connect("http://localhost:3002")
    const schema = yup.object().shape({
        message: yup.string().required("Message is required")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        socket.emit("send_message", data)
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            alert(data.message)
        })
    }, [socket])


    return (
        <div className='container mt-3'>
            <h5>Socket Practice</h5>
            <div className='card col-6 offset-3'>
                <div className='card-body'>
                    <h3 className='text-info'>Send Message to emit an event</h3>
                    <form className='mt-4 pb-2' onSubmit={handleSubmit(onSubmit)} method='Post'>
                        <div className='row'>
                            <div className='col-3'>
                                <label htmlFor='message'>Message: </label>
                            </div>
                            <div className='col-9'>
                                <input className='form-control' type='text' id='message' {...register("message")} />
                            </div>
                            <span className='text-danger'>{errors.message?.message}</span>
                        </div>
                        <br />
                        <Button variant="outline-success btn-lg" type='submit'>Send</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Messages