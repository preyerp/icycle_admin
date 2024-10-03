import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  height: 200vh;
  background: #f0f0f0;
`;

const ParallaxSection = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: ${({ scrollY }) => scrollY * 0.5}px;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0') center center;
  background-size: cover;
  transform: translateY(-20%);
  transition: transform 0.1s ease-out;
  z-index: -1;
`;

const Foreground = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${({ scrollY }) => scrollY * 0.2}px);
  transition: transform 0.1s ease-out;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

function ScrollActionTest(props) {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <GlobalStyle />
            <Container>
                <ParallaxSection>
                    <Background scrollY={scrollY} />
                    <Foreground scrollY={scrollY}>
                        <Content>
                            <h1>Scroll Down</h1>
                            <p>Enjoy the parallax effect as you scroll!</p>
                        </Content>
                    </Foreground>
                </ParallaxSection>
                {/* More sections or content here */}
            </Container>
        </>
    );
};

export default ScrollActionTest;
