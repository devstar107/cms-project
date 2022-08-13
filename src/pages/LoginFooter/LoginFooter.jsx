import React from 'react'
import { Link } from 'react-router-dom'
import './LoginFooter.scss'

const LoginFooter = () => {
  return (
    <div className='login_footer'>
      <div className='links'>
        <p>
          <Link to='/'>Home</Link>
        </p>
        <p>
          <Link to='/about'>About</Link>
        </p>
      </div>
      <div className='times'>
        <div>
          <p>LA Office</p>
          <h3>5-03pm</h3>
        </div>
        <div>
          <p>UK Office</p>
          <h3>3-03am</h3>
        </div>
      </div>
    </div>
  )
}

export default LoginFooter
