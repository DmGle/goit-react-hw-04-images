import React, { useEffect, useCallback } from 'react';

const Modal = ({ onClose, image }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleKeyDown]);

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;