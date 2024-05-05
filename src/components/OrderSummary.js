import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='mt-3 pb-2'>
                <h5>Order Summary</h5>
            </div>
            <Button variant="outline-info" onClick={() => navigate(-1)}>Go Back</Button>
        </>
    )
}

export default OrderSummary