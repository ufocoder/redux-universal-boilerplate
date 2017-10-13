import React from 'react'
import PropTypes from 'prop-types'
import {IndexLink, Link} from 'react-router'

const Header = (props) => {
  const links = [
    {
      to: '/trends',
      title: 'Github trends'
    },
    {
      to: '/about',
      title: 'About'
    },
    {
      to: '/404',
      title: 'Non-exists page'
    }
  ]

  if (props.loggedIn) {
    links.push({
      to: '/profile',
      title: 'Profile'
    })
    links.push({
      to: '/logout',
      title: 'Logout'
    })
  } else {
    links.push({
      to: '/login',
      title: 'Login'
    })
  }

  return (
    <div className='ui text container'>
      <h1 className='ui dividing header'>
        Redux universal boilerplate
      </h1>
      <div className='ui secondary pointing menu'>
        <IndexLink
          className='item'
          to='/'
          activeClassName='active'>
          Homepage
        </IndexLink>
        { links.map(function (link, i) {
          return (
            <Link
              to={link.to}
              key={i}
              className='item'
              activeClassName='active'>
              {link.title}
            </Link>
          )
        }) }
      </div>
    </div>
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool
}

export default Header
