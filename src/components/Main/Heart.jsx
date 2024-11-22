import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Heart() {
  const [heart, setHeart] = useState(false);
  const heartChange = () => setHeart(!heart);

  return (
    <span onClick={heartChange}>
      {heart ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-red-500" />}
    </span>
  );
}

export default Heart;
