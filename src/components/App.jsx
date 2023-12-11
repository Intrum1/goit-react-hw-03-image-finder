import React, { Component } from 'react';
import SearchBar from './SearchBar/SeachBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from '../Services/Api';
import styles from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    selectedImage: '',
    hasMoreImages: true,
    isLoading: false,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });

      const data = await fetchImages({ query, page });

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalImages: data.totalHits,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      hasMoreImages: true,
      totalImages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = selectedImage => {
    this.setState({ showModal: true, selectedImage });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, showModal, selectedImage, isLoading, totalImages } =
      this.state;

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length !== totalImages && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
