import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './styles.css';

const API_KEY = '40969822-9ca982a77db095185d4787118';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const perPage = 12;

  const fetchImages = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      const newImages = response.data.hits;

      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page, perPage]);

  useEffect(() => {
    const fetchData = async () => {
      if (query !== '') {
        await fetchImages();
      }
    };

    fetchData();
  }, [query, fetchImages]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleImageClick = (url) => {
    setShowModal(true);
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length >= perPage && <Button onClick={handleLoadMore} hasMore={!isLoading} />}
      {showModal && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;