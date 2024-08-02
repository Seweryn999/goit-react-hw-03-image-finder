import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  smallUrl,
  alt,
  bigFormatUrl,
  galleryStateFunc,
}) => {
  const cbClickHandler = (desc, url) => {
    return {
      bigFormatUrl: url,
      alt: desc,
    };
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={smallUrl}
        alt={alt}
        className={css.galleryItemImage}
        onClick={() => galleryStateFunc(cbClickHandler(alt, bigFormatUrl))}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  bigFormatUrl: PropTypes.string.isRequired,
  galleryStateFunc: PropTypes.func.isRequired
};

export default ImageGalleryItem;
