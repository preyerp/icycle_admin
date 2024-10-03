import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollMoveTest = () => {
  const ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref}>
      <div id="section1" style={{ height: '100vh', backgroundColor: 'lightblue' }}>
        첫번째 섹션
      </div>
      <div id="section2" style={{ height: '100vh', backgroundColor: 'lightgreen' }}>
        두번째 섹션
      </div>
    </div>
  );
};

export default ScrollMoveTest;
