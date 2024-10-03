import React, { useState, useEffect } from 'react';
import styled from "styled-components";

// styled components
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* 추가 콘텐츠가 보일 수 있도록 최소 높이 설정 */
  background-color: #333333;
  overflow-y: auto; /* 스크롤바가 보이도록 설정 */
`;

const Container = styled.div`
  width: 100%;
  height: 100vh; /* 첫 화면 크기 고정 */
  position: relative;
`;

const Image = styled.img`
  width: ${(props) => props.width}%;
//   max-width: 50vw; /* 이미지 최대 너비를 화면의 절반으로 설정 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${(props) => props.opacity}; /* 이미지 투명도 조절 */
  transition: width 0.1s ease, opacity 0.8s ease;
`;
const ImgContents = styled.div`
  width: 100%;
  height: calc(2* 130vh);
  background-color: red;
`;
const FixContainer = styled.div`
  width: 100%;
  height: 100svh;
//   background-color: blue;
//   opacity:0.4;
  position: fixed;
  top:0;
  overflow:hidden;
`;
const ImgContentContainer = styled.div`
  width: 50%;
  height: 100svh;
  margin-inline: auto;
  position: relative;
`;
const TextContents = styled.div`
  width: 100%;
  height: 100vh;
  background-color: yellow;
  z-index: 50;
  position: relative;

`;
function InteractionTest(props) {

    const [scrollAmount, setScrollAmount] = useState(0);

    const handleScroll = (e) => {
        setScrollAmount(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 이미지 크기와 투명도를 스크롤에 따라 계산
    const getImageSizeAndOpacity = (scroll, start, end) => {
        if (scroll >= start && scroll <= end) {
            const size = 100 - ((scroll - start) / (end - start)) * 30; // 100%에서 70%까지만 줄어듦
            const opacity = 1
            console.log("size")
            console.log(size)
            return { size, opacity };
        } else if (scroll < start) {
            return { size: 100, opacity: 0 }; // 초기 크기와 불투명도
        }
        return { size: 70, opacity: 0 }; // end 이후에는 70% 크기지만 사라짐
    };

    const { size: image1Size, opacity: image1Opacity } = getImageSizeAndOpacity(scrollAmount, 0, 1000); //첫번째 그림
    const { size: image2Size, opacity: image2Opacity } = getImageSizeAndOpacity(scrollAmount, 1000, 2000);


    console.log("scrollAmount")
    console.log(scrollAmount)

    return (
        <Wrapper>
            <ImgContents>
                <FixContainer>
                    <ImgContentContainer>
                        <Image src="image1.jpg" width={image1Size} opacity={image1Opacity} />
                        <Image src="image2.jpg" width={image2Size} opacity={image2Opacity} />
                    </ImgContentContainer>
                </FixContainer>
            </ImgContents>
            <TextContents>
                새로운 콘텐츠가 여기에 나타납니다!
            </TextContents>
        </Wrapper>
    )
}

export default InteractionTest;