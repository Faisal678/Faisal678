import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Goals = () => {

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? 'teal' : 'white'
        }
    }

    return (
        <div className='container mt-3'>
            <nav className='mt-2'>
                <NavLink to='set-goal' style={navLinkStyles}>Set Goal</NavLink>
                <NavLink to='goals-list' style={navLinkStyles}>Goals List</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}

export default Goals