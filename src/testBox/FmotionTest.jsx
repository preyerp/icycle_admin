import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { motion, useScroll, useTransform } from 'framer-motion';
import TextWithGlitch from './GlitchTextComponent';
import TextScrambleComponent from './TextScrambleComponent';
import TextScrambleWithGlitch from './TextScrambleWithGlitch';

// styled components
const Wrapper = styled.div`
  width: 100%;
  min-height: 1000vh; /* 추가 콘텐츠가 보일 수 있도록 최소 높이 설정 */
  background-color: #FFFFFF;
  overflow-y: auto; /* 스크롤바가 보이도록 설정 */
`;

const Box = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  position: fixed;
  top: 0;
  left: 0;
  perspective: 1000px; /* 3D 효과를 위해 추가 */
`;


// 비디오 스타일 컴포넌트
const Video = styled(motion.video).attrs({
  loop: true,
  autoPlay: true,
  muted: true,
  // loading: "lazy", // 지연 로딩 속성 추가
})`
    width: 100%;
    position: relative;
    transition: clip-path 0.5s ease;
  `;
const VideoWrapper = styled(motion.div)`
  width: 65%;
  margin: auto;
  position: absolute;
  transition: opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease;
`;
const VideoContent = styled.div`
  height: 350vh; /* 스크롤이 가능하도록 컨텐츠의 높이를 200vh로 설정 */
`;
const TextContents = styled.div`
  width: 100%;
  height: 650vh;
  background-color: black;
  z-index: 50;
  position: relative;
  color: #ffffff;
`;


function FmotionTest(props) {

  const { scrollYProgress } = useScroll(); // useScroll 훅으로 스크롤 위치 추적
  // 824/904 // 1655/ 1762
  const { scrollY } = useScroll(); // 스크롤의 Y 좌표 값 추적
  const [scrollPixel, setScrollPixel] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      console.log("현재 스크롤 위치: ", latest); // 현재 스크롤 위치 출력
      setScrollPixel(latest);
    });

    // 구독 해제
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    // 휠 이벤트 핸들러 정의
    const wheelHandler = (e) => {
      const { deltaY } = e;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollPixel >= 798 && scrollPixel < 908) {
          window.scrollTo({
            top: 904,
            left: 0,
            behavior: "smooth",
            transition: "all 0.5s ease"
          });
        } else if (scrollPixel >= 1500 && scrollPixel < 1900) {
          window.scrollTo({
            top: 1800,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollPixel >= 798 && scrollPixel < 908) {
          window.scrollTo({
            top: 820,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollPixel >= 1595 && scrollPixel < 1900) {
          window.scrollTo({
            top: 1600,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    // window에 휠 이벤트 핸들러 등록
    window.addEventListener("wheel", wheelHandler, { passive: false });

    // useEffect 클린업 함수로 이벤트 해제
    return () => {
      window.removeEventListener("wheel", wheelHandler);
    };
  }, [scrollPixel]); // scrollPixel이 변경될 때마다 wheelHandler 업데이트




  // 첫 번째 비디오의 opacity와 scale 설정
  const opacity1 = useTransform(scrollYProgress, [0.098, 0.103], [1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const clipPath1 = useTransform(scrollYProgress, [0.098, 0.103], ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const trans3d1 = useTransform(scrollYProgress, [0.1, 0.105], ["translate3d(0, 0, 0px)", "translate3d(0, 0, -300px)"]);


  // 두 번째 비디오의 opacity와 scale 설정
  const opacity2 = useTransform(scrollYProgress, [0.095, 0.1, 0.198, 0.2], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.1, 0.2], [1, 0.9]);
  const clipPath2 = useTransform(scrollYProgress, [0.1, 0.105], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const bright2 = useTransform(scrollYProgress, [0.1, 0.105, 0.108], ["brightness(0)", "brightness(10)", "brightness(1)"]);
  const trans3d2 = useTransform(scrollYProgress, [0.1, 0.105, 0.2, 0.205], ["translate3d(0, 0, 300px)", "translate3d(0, 0, 0px)", "translate3d(0, 0, 0px)", "translate3d(0, 0, -300px)"]);
  // scale과 translate3d를 결합한 transform 값 생성
  // const combinedTransform = useTransform([scale2, trans3d2], ([s, t]) => {
  //   return `${t} scale(${s})`;
  // });


  // 두 번째 비디오의 opacity와 scale 설정
  const opacity3 = useTransform(scrollYProgress, [0.195, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.2, 0.3], [1, 0.9]);
  const clipPath3 = useTransform(scrollYProgress, [0.2, 0.205], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const bright3 = useTransform(scrollYProgress, [0.2, 0.205, 0.208], ["brightness(0)", "brightness(10)", "brightness(1)"]);
  const trans3d3 = useTransform(scrollYProgress, [0.2, 0.205], ["translate3d(0, 0, 300px)", "translate3d(0, 0, 0px)"]);


  // const [transitionStyle, setTransitionStyle] = useState(`
  //   transition: opacity 0.5s ease, clip-path 0.5s ease;
  // `);

  // useEffect(() => {
  //   const unsubscribe = scrollYProgress.onChange((latest) => {
  //     if (latest >= 0.09 && latest <= 0.12) {
  //       setTransitionStyle(`
  //         transition: all 0.7s ease;
  //       `);
  //     } else {
  //       setTimeout(function () {
  //         setTransitionStyle(`
  //           transition: opacity 0.5s ease, clip-path 0.5s ease;
  //         `);
  //       }, 700)
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [scrollYProgress]);


  return (
    <Wrapper>
      <Box>
        {/* <Video src="video1.mp4" style={{ opacity: opacity1, scale: scale1, clipPath: clipPath1 }} /> */}
        {/* <Video src="video1.mp4" style={{ opacity: opacity1, scale: scale1, clipPath: clipPath1 }} /> */}
        {/* <Video src="video1.mp4" style={{ opacity: opacity2, clipPath: clipPath2, transform: combinedTransform }} /> */}

        <VideoWrapper style={{ opacity: opacity1, transform: trans3d1 }}>
          <Video src="video1.mp4" style={{ scale: scale1, clipPath: clipPath1 }} />
        </VideoWrapper>
        <VideoWrapper style={{ opacity: opacity2, transform: trans3d2, filter: bright2 }}>
          <Video src="video1.mp4" style={{ scale: scale2, clipPath: clipPath2 }} />
        </VideoWrapper>
        <VideoWrapper style={{ opacity: opacity3, transform: trans3d3, filter: bright3 }}>
          <Video src="video1.mp4" style={{ scale: scale3, clipPath: clipPath3 }} />
        </VideoWrapper>

        {/* <Video src="video1.mp4" style={{ opacity: opacity3, scale: scale3, clipPath: clipPath3 }} /> */}
      </Box>
      <VideoContent/>
      <TextContents>
        <TextWithGlitch text="icicle" />
        <TextScrambleComponent text="ofweaefo"/>
        <TextScrambleWithGlitch />
        <img src="https://firebasestorage.googleapis.com/v0/b/icyupload.appspot.com/o/images%2FKakaoTalk_20240926_204932972.png?alt=media&token=73a2ca20-7389-46a9-a80a-4ff0d7a6786a" alt="Firebase Image" />

      </TextContents>
    </Wrapper>
  )
}

export default FmotionTest;