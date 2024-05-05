import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Home = () => {
    const navigate = useNavigate();
    const { data } = useQuery(["abc"], async () => {
        const res = await axios.get("https://catfact.ninja/fact")
        return res.data
    })
    return (
        <div className='container mt-3'>
            <h5 className='pt-2'>Fetching Data using React Query</h5>
            <p>{data?.fact}</p>
            <Button variant="outline-info" onClick={() => navigate('order-summary')}>Place Order</Button>
        </div>
    )
}

export default Home