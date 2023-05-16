import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentDidUpdate() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleBeckdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.hendleBeckdropClick}>
        <div className={css.Modal}>
          <img src={this.props.urlPhoto.url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  urlPhoto: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};
