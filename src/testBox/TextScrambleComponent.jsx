// TextScrambleComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
`;

const Text = styled.div`
  font-weight: 100;
  font-size: 28px;
  color: #FAFAFA;
`;

const Dud = styled.span`
  color: #757575;
`;

// TextScramble 클래스
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// 리액트 컴포넌트
const TextScrambleComponent = () => {
  const [phrases] = useState([
    'Neo,',
    'sooner or later',
    "you're going to realize",
    'just as I did',
    "that there's a difference",
    'between knowing the path',
    'and walking the path'
  ]);
  const textRef = useRef(null);
  const fxRef = useRef(null);
  let counter = 0;

  useEffect(() => {
    const fx = new TextScramble(textRef.current);
    fxRef.current = fx;

    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  }, [phrases]);

  return (
    <Container>
      <Text ref={textRef}></Text>
    </Container>
  );
};

export default TextScrambleComponent;
