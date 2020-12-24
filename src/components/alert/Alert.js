import React from "react";
import PropTypes from "prop-types";

export const Alert = ({ text }) => {
  return (
    <div className="alert alert-danger text-center" role="alert">
      {text}
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};
