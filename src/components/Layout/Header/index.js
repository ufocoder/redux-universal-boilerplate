import React from "react";
import {IndexLink, Link} from 'react-router';
import {connect} from 'react-redux';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn
  })
)
export default class Header extends React.Component {
  render() {

    let links = [
      {
        to: '/trends',
        title: 'Github trends'
      },
      {
        to: '/about',
        title: 'About'
      },
    ];

    if (! this.props.loggedIn) {
      links.push({
        to: '/login',
        title: 'Login'
      });
    } else {
      links.push({
        to: '/profile',
        title: 'Profile'
      });
      links.push({
        to: '/logout',
        title: 'Logout'
      });
    }

    return (
      <div className="ui text container" style={{  marginTop: '50px' }}>
        <h1 className="ui dividing header">Redux universal boilerplate</h1>
        <div className="ui secondary pointing menu">
          <IndexLink to="/" className="item" activeClassName="active">Homepage</IndexLink>
          {
            links.map(function(link) {
              return <Link to={link.to} className="item" activeClassName="active">{link.title}</Link>
            })
          }
        </div>
      </div>
    );
  }
}
