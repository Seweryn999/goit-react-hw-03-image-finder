import React, { Component } from 'react';
import PropTypes from 'prop-types'
import css from './Modal.module.css';

export class Modal extends Component {

  render() {
    const properties = this.props
    const {descr, source, closeModalMouse,} = properties
    return (
      <div className={css.overlay} onClick={closeModalMouse}>
        <div className={css.modal}>
          Modal
          <img src={source} alt={descr} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModalKey)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.props.closeModalKey)
  }
}

Modal.propTypes = {
  descr: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  closeModalMouse: PropTypes.func.isRequired,
  closeModalKey: PropTypes.func.isRequired
}

export default Modal;
