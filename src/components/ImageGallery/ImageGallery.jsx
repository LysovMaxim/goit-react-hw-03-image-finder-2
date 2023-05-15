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
}
  
ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  onModal: PropTypes.func.isRequired,
};


