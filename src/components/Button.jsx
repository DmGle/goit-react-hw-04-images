import React from 'react';

const Button = ({ onClick, hasMore }) => {
  return (
    <button className="Button" onClick={onClick} disabled={!hasMore}>
      Load more
    </button>
  );
};

export default Button;