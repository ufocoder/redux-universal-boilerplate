import React from 'react';

export default class Header extends React.Component {
  render() {
    const date = new Date();
    return (
        <footer className="ui vertical footer segment">
          <div className="ui text container">
            © { date.getFullYear() }, All rights reserved
          </div>
        </footer>
    );
  }
}

