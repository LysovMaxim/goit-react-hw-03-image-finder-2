import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    pictures: [],
    error: null,
    status: null,
    showeModal: false,
    urlPicture: '',
  };

  hendleSubmit = event => {
    event.preventDefault();
    const value = event.currentTarget.elements.pictureName.value;
    if (value.trim() === '') {
      alert('Enter the title');
      return;
    }
    if (value === this.state.pictureName) {
      alert(`You have already entered the word ${value}`)
      return
    }
    this.setState({
      pictureName: value.toLowerCase(),
      pictures: [],
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onModal = url => {
    this.setState(prevState => ({
      showeModal: !prevState.showeModal,
      urlPicture: { url },
    }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevName = prevState.pictureName;
    const nextName = this.state.pictureName;

    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=34851334-286cf58f2651b78053c9b207d&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(picture => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...picture.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  };

  render() {
    return (
      <div className={css.App}>
        {this.state.status === 'rejected' && (
          <h1>{this.state.error.message}</h1>
        )}
        <Searchbar onSubmit={this.hendleSubmit} />
        <ImageGallery pictures={this.state.pictures} onModal={this.onModal} />
        {this.state.showeModal && (
          <Modal onClose={this.onModal} urlPhoto={this.state.urlPicture} />
        )}

        {this.state.status === 'pending' && <Loader />}
        {this.state.pictures.length >= 12 && (
          <Button onClick={this.onLoadMore} />
        )}
      </div>
    );
  }
}
