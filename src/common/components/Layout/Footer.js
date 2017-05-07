import React from 'react';

const Header = () => (
  <footer className="ui vertical footer segment">
    <div className="ui text container">
      © {(new Date()).getFullYear()}, All rights reserved
    </div>
  </footer>
);

export default Header;
