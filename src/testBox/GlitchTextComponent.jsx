// GlitchTextComponent.jsx
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const glitchAnimation = keyframes`
  0% {
    --split: 20;
    --shift: 15;
    --shadow: -2;
  }
  5% {
    --split: 30;
    --shift: 15;
    --shadow: -2;
  }
  10% {
    --split: 80;
    --shift: 10;
    --shadow: -2;
  }
  15% {
    --split: 55;
    --shift: 10;
    --shadow: -2;
  }
  20% {
  }
  50% {
    --split: 0;
    --shift: 0;
    --shadow: 0;
  }
  100% {
    --split: 0;
    --shift: 0;
    --shadow: 0;
  }
`;

// 스타일 컴포넌트 정의
const GlitchText = styled.div`
  display: inline-block;
  position: relative;
  color: transparent;
  font-size: 10rem; /* 텍스트 크기 조절 */
  font-weight: bold;
  animation: ${glitchAnimation} 1.2s infinite ease-in-out alternate-reverse;

  &::after,
  &::before {
    content: attr(data-char);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: white;   /* 텍스트 색상 조절 */
    clip-path: var(--clip);
  }

  &::after {
    transform: translate(calc(var(--shift) * 1%), 0);
    --clip: inset(0 0 calc(var(--split) * 1%) 0);
    text-shadow: calc(var(--shadow) * 1px) calc(var(--shadow) * 1px) #ff0000; /* 텍스트 테두리 생상 조절 */
  }

  &::before {
    --clip: inset(calc((95 - var(--split)) * 1%) 0 0 0);
  }
`;

const TextWithGlitch = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const { Splitting } = window;
    if (textRef.current) {
      Splitting({ target: textRef.current });
    }
  }, []);

  return (
    <div className="container">
      <div className="glitch--3" ref={textRef}>
        {text.split('').map((char, index) => (
          <GlitchText key={index} data-char={char}>
            {char}
          </GlitchText>
        ))}
      </div>
    </div>
  );
};

export default TextWithGlitch;
