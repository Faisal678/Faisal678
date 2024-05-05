import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Products = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? 'teal' : 'white'
    }
  }
  return (
    <div className='mt-3'>
      <h5>List of Products</h5>
      <nav className='mt-2'>
        <NavLink to='featured-products' style={navLinkStyles}>Featured</NavLink>
        <NavLink to='new-products' style={navLinkStyles}>New</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default Products