import React from 'react';
import PropTypes from 'prop-types'
import css from './Button.module.css'

const Button = ({ pagehandler }) => {
  return (
    <button type="button" onClick={pagehandler} className={css.loadmore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  pagehandler: PropTypes.func.isRequired
}

export default Button;
