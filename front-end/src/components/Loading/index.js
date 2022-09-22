import React from 'react';
import './styles.css';

export default function Loader() {
  return (
    <div className="loader">
      <div className="image-loader" />
      <div className="product-container-info info-loader">
        <div className="product-name name-loader" />
        <div className="rating rating-loader" />
        <div className="buttons-loader" />
        <div className="value-loader" />
        <div className="add-loader" />
      </div>
    </div>
  );
}
