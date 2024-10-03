import React, { useEffect } from 'react';
import '../GlitchText.css';

const GlitchText = ({ text }) => {
  useEffect(() => {
    // `Splitting` 기능을 직접 구현하거나 외부 라이브러리를 사용할 수 있습니다.
    // 여기서는 단순히 텍스트를 span 요소로 분할하는 예시를 제공합니다.
    const splitText = (text) => {
      return text.split('').map((char, index) => (
        <span key={index} data-char={char}>
          {char}
        </span>
      ));
    };

    const container = document.querySelector('.glitch-container');
    if (container) {
      container.innerHTML = '';
      splitText(text).forEach(el => container.appendChild(el));
    }
  }, [text]);

  return (
    <div className="glitch-container glitch--3">
      {/* Text will be dynamically inserted here */}
    </div>
  );
};

export default GlitchText;
