import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';

const useDynamicForm = () => {
    const schema = yup.object().shape({
        messages: yup.array().of(
            yup.object().shape({
                firstName: yup.string().required('First Name is required'),
                lastName: yup.string().required('Last Name is required'),
            })
        ),
    });

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'messages',
    });

    const hasAddedDefaultRow = useRef(false);

    useEffect(() => {
        // Check if fields.length is zero and add a default field if needed
        if (!hasAddedDefaultRow.current && fields.length === 0) {
            append({ firstName: '', lastName: '' });
            hasAddedDefaultRow.current = true;
        }
    }, [fields, append]);

    const onSubmit = (data) => {
        if (fields.length === 0) {
            alert('Please add at least one message');
            return;
        }

        console.log('send_messages', data);
        reset();
    };

    return {
        fields,
        append,
        remove,
        onSubmit,
        errors,
        register,
        handleSubmit,
    };
};

export default useDynamicForm;
