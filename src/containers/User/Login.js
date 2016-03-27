import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/Auth';
import Error from '../../components/Error';

@connect(
  state => ({
    user: state.auth.user,
    error: state.auth.error
  }),
  dispatch => ({
    submit: (username, password) => {
      dispatch(login(username, password))
    }
  })
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    submit: PropTypes.func,
  }

  handleSubmit = (event) => {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    event.preventDefault();

    this.props.submit(username, password);
  }

  render() {
    return (
      <div>
        <h2>Login form</h2>
        { this.props.error ?
          (
            <Error title="Auth error" message={this.props.error} />
          ) : null
        }
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input type="text" ref="username" placeholder="Enter a username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" ref="password" placeholder="Last Name" />
          </div>
          <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
