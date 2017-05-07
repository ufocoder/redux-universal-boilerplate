import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => (
  <div className="ui negative message">
    {props.title && (
      <div className="header">
        {props.title }
      </div>
    )}
    {props.message && (
      <p>{props.message}</p>
    )}
  </div>
);

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
