
import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import TextWithGlitch from './GlitchTextComponent';

const Wrapper = styled.div`
  width: 100%;
  min-height: 1000vh; /* 추가 콘텐츠가 보일 수 있도록 최소 높이 설정 */
  background-color: white;
  overflow-y: auto; /* 스크롤바가 보이도록 설정 */
`;

const GlitchScroll = () => {

    return (
        <Wrapper>
            <TextWithGlitch text="icicle" />
        </Wrapper>
    );
};

export default GlitchScroll;
