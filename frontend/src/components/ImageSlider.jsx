import React, { useState } from 'react';

const images = [
  'homepage.jpg',
  'homepage.jpg',
  'homepage.jpg',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div style={styles.slider}>
      <img
        src={images[currentIndex]}
        alt="Slide"
        style={styles.image}
      />

      {/* Dots */}
      <div style={styles.dotsContainer}>
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              ...styles.dot,
              backgroundColor: idx === currentIndex ? '#58A6FF' : '#6E7681',
              transform: idx === currentIndex ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      {/* Arrows */}
      <div style={styles.buttons}>
        <button style={styles.arrow} onClick={goToPrev}>{'‹'}</button>
        <button style={styles.arrow} onClick={goToNext}>{'›'}</button>
      </div>
    </div>
  );
};

const styles = {
  slider: {
    position: 'relative',
    width: '100%',
    maxWidth: '300px',
    backgroundColor: '#161B22',
    padding: '1rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '4px solid #0D1117',
  },
  dotsContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: '0.75rem',
    justifyContent: 'center',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '0.75rem',
  },
  arrow: {
    backgroundColor: '#21262D',
    color: '#C9D1D9',
    border: '1px solid #30363D',
    padding: '5px 12px',
    borderRadius: '4px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
};

export default ImageSlider;
