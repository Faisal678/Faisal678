import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout, reset } from '../redux/auth/authSlice'

const Navbar = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#0dcaf0' : 'white'
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <nav className='mt-5'>
            <NavLink to='/' style={navLinkStyles}>Home</NavLink>
            <NavLink to='/dynamic-form' style={navLinkStyles}>Dynamic Form</NavLink>
            {user ?
                (<>
                    <NavLink to='goals' style={navLinkStyles}>Goals</NavLink>
                    <NavLink to='products' style={navLinkStyles}>Products</NavLink>
                    <NavLink to='messages' style={navLinkStyles}>Messages</NavLink>
                    <Button variant="outline-info" onClick={onLogout}>Logout</Button>
                </>)
                : (<>
                    <NavLink to='login' style={navLinkStyles}>Login</NavLink>
                    <NavLink to='register' style={navLinkStyles}>Register</NavLink>
                </>)
            }
        </nav>
    )
}

export default Navbar