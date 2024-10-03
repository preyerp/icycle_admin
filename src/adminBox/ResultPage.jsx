import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 32px;
    margin-bottom: 20px;
    color: #2c3e50;
`;

const Image = styled.img`
    max-width: 100%;
    margin: 10px 0;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    margin-top: 20px;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    
    &:hover {
        background-color: #45a049;
    }
`;

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, subtitle, description, vimeoLink, images, teamMembers } = location.state; // 전달된 상태에서 데이터 가져오기

    return (
        <Container>
            <Title>업로드 결과 확인</Title>
            <h3>제목: {title}</h3>
            <p>부제목: {subtitle}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}>설명: {description}</p>
            <p>비메오 링크: <a href={vimeoLink} target="_blank" rel="noopener noreferrer">{vimeoLink}</a></p>

            <h3>이미지 확인</h3>
            <p>썸네일 이미지</p>
            {images.thumbnail && <Image src={images.thumbnail} alt="썸네일 이미지" />}
            <p>메인 이미지</p>
            {images.mainImage && <Image src={images.mainImage} alt="메인 이미지" />}
            <p>설명 이미지</p>
            {images.infoImage && <Image src={images.infoImage} alt="설명 이미지" />}

            <h3>팀원 정보</h3>
            {teamMembers.map((member, index) => (
                <div key={index}>
                    <p>이름: {member.name}</p>
                    <p>영어 이름: {member.englishName}</p>
                    <p>학과: {member.department}</p>
                    <p>이메일: {member.email}</p>
                    <p>인스타그램: {member.instagram}</p>
                    {member.profilePic && <Image src={member.profilePic} alt={`팀원 ${index + 1}의 프로필 사진`} />}
                </div>
            ))}

            <Button onClick={() => navigate('/')}>로그인페이지로 돌아가기</Button>
        </Container>
    );
};

export default ResultPage;
