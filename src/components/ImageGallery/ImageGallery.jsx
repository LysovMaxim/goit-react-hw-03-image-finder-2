import { ImageGalleryItem } from '../ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, onModal }) => {
  return (
    <>
      {
        <ul className={css.ImageGallery}>
          {pictures &&
            pictures.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                onClick={onModal}
                key={id}
                id={id}
                picture={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
        </ul>
      }
    </>
  );
};

ImageGallery.propTypes = {
  onModal: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
