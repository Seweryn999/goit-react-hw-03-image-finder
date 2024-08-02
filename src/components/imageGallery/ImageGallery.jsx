import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from 'components/modal/Modal';

export class ImageGallery extends Component {

  state = {
    bigUrl: '',
    description: '',
  };
  clearState = () => {
    this.setState({ bigUrl: '', description: '' });
  };

  closeModalEsc = e => {
    if (e.key === 'Escape') this.clearState();
  };

  closeModalClick = () => {
    this.clearState();
  };

  handleItem = callback => {
    const { bigFormatUrl, alt } = callback;
    this.setState({ bigUrl: bigFormatUrl, description: alt });
  };

  render() {
    const data = this.props.data;
    const state = this.state;
    const {bigUrl, description} = state
    return (
      <>
        <ul className={css.gallery}>
          {data.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              smallUrl={webformatURL}
              alt={tags}
              bigFormatUrl={largeImageURL}
              galleryStateFunc={this.handleItem}
            />
          ))}
        </ul>
        {bigUrl !== '' && (
          <Modal
            descr={description}
            source={bigUrl}
            closeModalMouse={this.closeModalClick}
            closeModalKey={this.closeModalEsc}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
