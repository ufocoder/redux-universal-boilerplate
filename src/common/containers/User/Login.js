import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login} from 'src/common/actions/Auth';
import Error from 'src/common/components/Error';
import {
  TEST_USERNAME,
  TEST_PASSWORD,
} from 'src/common/constants/application';

@connect(
  (state) => ({
    user: state.auth.user,
    error: state.auth.error,
    loggedIn: state.auth.loggedIn,
  }),
  (dispatch) => ({
    handleSubmit: (username, password) => {
      dispatch(login(username, password));
    },
    handleRedirect: () => {
      dispatch(push('/profile'));
    },
  })
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    loggedIn: PropTypes.bool,

    handleSubmit: PropTypes.func,
    handleRedirect: PropTypes.func,
  }

  handleSubmit = (event) => {
    const username = this.username.value;
    const password = this.password.value;

    event.preventDefault();

    this.props.handleSubmit(username, password);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.handleRedirect();
    }
  }

  render() {
    const userLayout = (
      <div>You already logged in</div>
    );

    const guestLayout = (
      <div>
        <Helmet title="Login" />

        <h2>Login form</h2>

        <div className="ui message">
          For test use this credentials: {TEST_USERNAME}/{TEST_PASSWORD}
        </div>

        { this.props.error ?
          (
            <Error title="Auth error" message={this.props.error} />
          ) : null
        }
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input type="text" ref={(ref) => {
              this.username = ref;
            }} placeholder="Enter a username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" ref={(ref) => {
              this.password = ref;
            }} placeholder="Last Name" />
          </div>
          <button
            className="ui button"
            type="submit"
            onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );

    return this.props.loggedIn ? userLayout : guestLayout;
  }
}
