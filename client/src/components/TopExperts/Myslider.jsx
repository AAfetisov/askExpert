import React, { cloneElement, useEffect, useState } from 'react';
import './Myslider.css';

export function Slider() {
  const [active, setActive] = useState(0);
  let scrollInterval = null;

  const carouselItems = [
    <div>slide 1</div>,
    <div>slide 2</div>,
    <div>slide 3</div>,
  ];

  useEffect(() => {
    scrollInterval = setTimeout(() => {
      setActive((active + 1) % carouselItems.length);
    }, 2000);

    return () => clearTimeout(scrollInterval);
  });

  return (
    <div className="carousel">
      {carouselItems.map((item, index) => {
        const activeClass = active === index ? ' visible' : '';
        return cloneElement(item, {
          className: `carousel-item${activeClass}`,
        });
      })}
    </div>
  );
}
