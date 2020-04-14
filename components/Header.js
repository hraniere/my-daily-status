import React from 'react'
import NavBar from './NavBar'

const Header = () => {
  return (
    <div>
      <div className='bg-gray-200'>
        <h1>
          < img className = "h-24 mx-auto py-4"
          src = "/logo.png"
          alt = "logotipo da página" />
        </h1>
        <NavBar />
      </div>
    </div>
  )
}

export default Header