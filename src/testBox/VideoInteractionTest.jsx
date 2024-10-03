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


// 비디오 스타일 컴포넌트
const Video = styled.video.attrs({
    loop: true,
    autoPlay: true,
    muted: true,
})`
    width: ${(props) => props.width}%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${(props) => props.opacity}; /* 비디오 투명도 조절 */
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
  width: 70%;
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
function VideoInteractionTest(props) {

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

    // 비디오 크기와 투명도를 스크롤에 따라 계산
    const getVideoSizeAndOpacity = (scroll, start, end) => {
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

    const { size: video1Size, opacity: video1Opacity } = getVideoSizeAndOpacity(scrollAmount, 0, 1000); // 첫 번째 비디오
    const { size: video2Size, opacity: video2Opacity } = getVideoSizeAndOpacity(scrollAmount, 1000, 2000);

    console.log("scrollAmount")
    console.log(scrollAmount)

    return (
        <Wrapper>
            <ImgContents>
                <FixContainer>
                    <ImgContentContainer>
                        <Video src="video1.mp4" width={video1Size} opacity={video1Opacity} />
                        <Video src="video1.mp4" width={video2Size} opacity={video2Opacity} />
                    </ImgContentContainer>
                </FixContainer>
            </ImgContents>
            <TextContents>
                새로운 콘텐츠가 여기에 나타납니다!
            </TextContents>
        </Wrapper>
    )
}

export default VideoInteractionTest;