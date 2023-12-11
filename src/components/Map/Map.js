import React, { useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './style.css';

const Map = () => {
  const slideRef = useRef(null);

  useEffect(() => {
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    nextButton.onclick = function () {
      let lists = slideRef.current.querySelectorAll('.item');
      slideRef.current.appendChild(lists[0].cloneNode(true));
      slideRef.current.removeChild(lists[0]);
    };

    prevButton.onclick = function () {
      let lists = slideRef.current.querySelectorAll('.item');

      if (lists.length > 1) {
        slideRef.current.insertBefore(lists[lists.length - 1].cloneNode(true), lists[0]);
        slideRef.current.removeChild(lists[lists.length - 1]);
      } else {
        // If only one item is left, clone and append the existing item
        slideRef.current.appendChild(lists[0].cloneNode(true));
      }
    };
  }, []); // Run this effect only once after initial render

  return (
    <div className="container-m">
      <div id="slide" ref={slideRef}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Slide key={index} index={index} />
        ))}
      </div>
      <SliderButtons />
    </div>
  );
};

const Slide = ({ index }) => (
  <div className="item" style={{ backgroundImage: `url(./${index}.jpg)` }}>
    <div className="content">
      <div className="name">DEV</div>
      <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
      <button>See more</button>
    </div>
  </div>
);

const SliderButtons = () => (
  <div className="buttons">
    <button id="prev">
      <FaAngleLeft />
    </button>
    <button id="next">
      <FaAngleRight />
    </button>
  </div>
);

export default Map;
