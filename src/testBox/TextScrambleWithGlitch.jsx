// TextScrambleComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import $ from 'jquery'; // jQuery 사용을 위해 설치 필요: npm install jquery

// 스타일 정의
const Container = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  left: 0;
  top: 0;
  background: radial-gradient(ellipse at 50% 50%, #20202d 0%, #101018 75%, #060612 100%);
`;

const Message = styled.div`
  margin-left: -300px;
  margin-top: -130px;
  position: absolute;
  height: 260px;
  width: 600px;
  left: 50%;
  top: 50%;
`;

const P = styled.p`
  font-family: Courier, monospace;
  color: #b95;
  font-size: 18px;
  text-shadow: 0 0 8px rgba(255, 153, 85, 0.3);
  margin: 0.8em 0;
`;

const Ghost = styled.span`
  opacity: 0.25;
`;

const Glitch = styled.span`
  opacity: 0.25;
`;

// 텍스트 스크램블 함수
const scramble = (element, text, options = {}) => {
  const defaults = {
    probability: 0.2,
    glitches: '-|/\\',  // 글리치효과 변경
    blank: '',
    duration: text.length * 40,
    ease: 'easeInOutQuad',
    delay: 0.0,
  };

  const settings = { ...defaults, ...options };
  const $element = $(element);
  const shuffle = () => (Math.random() < 0.5 ? 1 : -1);
  const wrap = (text, classes) => `<span class="${classes}">${text}</span>`;

  const glitchText = settings.glitches;
  const glitchCharacters = glitchText.split('');
  const glitchLength = glitchCharacters.length;
  const glitches = glitchCharacters.map(letter => wrap(letter, 'glitch'));

  const ghostText = $element.text();
  const ghostCharacters = ghostText.split('');
  const ghosts = ghostCharacters.map(letter => wrap(letter, 'ghost'));

  const textCharacters = text.split('');
  const order = [...Array(text.length).keys()].sort(shuffle);
  const output = [];

  for (let i = 0; i < text.length; i++) {
    const glitchIndex = Math.floor(Math.random() * (glitchLength - 1));
    const glitchCharacter = glitches[glitchIndex];
    const ghostCharacter = ghosts[i] || settings.blank;
    const addGlitch = Math.random() < settings.probability;
    const character = addGlitch ? glitchCharacter : ghostCharacter;
    output.push(character);
  }

  const object = { value: 0 };
  const target = { value: 1 };
  const parameters = {
    duration: settings.duration,
    step: () => {
      const progress = Math.floor(object.value * (text.length - 1));
      for (let i = 0; i <= progress; i++) {
        const index = order[i];
        output[index] = textCharacters[index];
      }
      $element.html(output.join(''));
    },
    complete: () => {
      $element.html(text);
    },
  };

  $(object).delay(settings.delay).animate(target, parameters);
};

// 리액트 컴포넌트
const TextScrambleWithGlitch = () => {
//   const [messages] = useState([
//     { delay: 0, text: 'Incoming transmission...' },
//     { delay: 1200, text: "You don't talk to anybody." },
//     { delay: 2200, text: "You don't interact with anybody." },
//     { delay: 3600, text: "Your whole sense of reality is, pretty warped..." },
//     { delay: 5200, text: "Does it bother you that we're not real?" },
//   ]);

  const [messages] = useState([
    { delay: 0, text: '해시함수 실행중...' },
    { delay: 1200, text: "졸업작품 불러오는중" },
    { delay: 2200, text: "카테고리 해시값 추출 시도. 카테고리 해시값 추출 시도" },
    { delay: 3600, text: "Your whole sense of reality is, pretty warped..." },
    { delay: 5200, text: "Does it bother you that we're not real?" },
  ]);

  const containerRef = useRef(null);
  const messageRef = useRef(null);
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    const $paragraphs = $(containerRef.current).find('p');
    setParagraphs($paragraphs);

    const animate = () => {
      messages.forEach((data, index) => {
        const element = $paragraphs.get(index);
        element.innerText = '';
        scramble(element, data.text, { delay: data.delay });
      });
    };

    animate();
  }, [messages]);

  return (
    <Container ref={containerRef}>
      <Message id="message" ref={messageRef}>
        {messages.map((msg, index) => (
          <P key={index}></P>
        ))}
      </Message>
    </Container>
  );
};

export default TextScrambleWithGlitch;
