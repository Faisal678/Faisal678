import React from 'react';
import { Button } from 'react-bootstrap';
import useDynamicForm from './useDynamicForm';

const DynamicForm = () => {
    const { fields, append, remove, onSubmit, errors, register, handleSubmit } = useDynamicForm();

    return (
        <div className='container mt-3'>
            <h5>Dynamic Form</h5>
            <div className='card col-6 offset-3'>
                <div className='card-body'>
                    <h3 className='text-info'>Add Dynamic Messages</h3>
                    <Button variant='outline-primary mt-3' onClick={() => append({ firstName: '', lastName: '' })}>
                        Add Message
                    </Button>
                    <form className='mt-4 pb-2' onSubmit={handleSubmit(onSubmit)} method='Post'>
                        {fields.map((field, index) => (
                            <div className='row' key={field.id}>
                                <div className='col-5 mt-3'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter first name'
                                        id={`firstName-${index}`}
                                        {...register(`messages[${index}].firstName`, { required: true })}
                                    />
                                    <span className='text-danger'>{errors?.messages && errors.messages[index]?.firstName?.message}</span>
                                </div>
                                <div className='col-5 mt-3'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter last name'
                                        id={`lastName-${index}`}
                                        {...register(`messages[${index}].lastName`, { required: index === 0 })}
                                    />
                                    <span className='text-danger'>{errors?.messages && errors.messages[index]?.lastName?.message}</span>
                                </div>
                                <div className='col-2 mt-3'>
                                    {index !== 0 && <Button variant='outline-danger btn-sm' onClick={() => remove(index)}>Remove</Button>}
                                </div>
                            </div>
                        ))}
                        <br />
                        <Button variant='outline-success btn-lg' type='submit'>
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DynamicForm;
