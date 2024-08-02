import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

class Searchbar extends Component {
  render() {
    return (
      <header className={css.searchbar}>
        <form
          className={css.form}
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(e.target.children[1].value);
          }}
        >
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
