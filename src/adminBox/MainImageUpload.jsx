import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 24px;
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
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
        background-color: #45a049;
    }
`;

const FileInput = styled.input`
    margin: 10px 0;
`;

const MainImageUpload = () => {
    const [mainImage, setMainImage] = useState(null);
    const [mainImageUrl, setMainImageUrl] = useState(""); // 기존 메인이미지 URL
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId; // 로그인 후 전달된 userId 사용

    useEffect(() => {
        if (userId) {
            fetchProjectData();
        } else {
            navigate('/');
        }
    }, [userId, navigate]);

    // Firestore에서 기존 프로젝트 정보 가져오기
    const fetchProjectData = async () => {
        try {
            const projectRef = doc(db, "projects", userId);
            const projectSnap = await getDoc(projectRef);

            if (projectSnap.exists()) {
                const projectData = projectSnap.data();
                setMainImageUrl(projectData.images?.mainImage || ""); // 기존 메인이미지 URL 설정
            } else {
                alert("프로젝트 데이터를 찾을 수 없습니다.");
                navigate('/');
            }
        } catch (error) {
            console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setMainImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!mainImage) {
            alert("메인이미지를 선택해주세요.");
            return;
        }

        setIsUploading(true);

        try {
            const mainImageRef = ref(storage, `projects/${userId}/mainImage.jpg`);
            const uploadTask = uploadBytesResumable(mainImageRef, mainImage);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("업로드 중 에러 발생:", error);
                    alert("업로드 중 문제가 발생했습니다.");
                    setIsUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    
                    // Firestore에 메인이미지 URL 업데이트
                    await updateDoc(doc(db, "projects", userId), {
                        "images.mainImage": downloadURL,
                    });

                    alert("메인이미지가 성공적으로 업데이트되었습니다!");
                    setMainImageUrl(downloadURL); // 새로운 메인이미지 URL 설정
                    setIsUploading(false);
                }
            );
        } catch (error) {
            console.error("업로드 중 에러 발생:", error);
            alert("업로드 중 문제가 발생했습니다.");
            setIsUploading(false);
        }
    };

    return (
        <Container>
            <Title>메인이미지 재업로드</Title>

            {mainImageUrl && (
                <>
                    <h3>현재 메인이미지</h3>
                    <Image src={mainImageUrl} alt="현재 메인이미지" />
                </>
            )}

            <h3>새로운 메인이미지 업로드</h3>
            <FileInput type="file" onChange={handleFileChange} />

            {isUploading && (
                <div>
                    <p>업로드 중입니다: {Math.round(uploadProgress)}%</p>
                </div>
            )}

            <Button onClick={handleUpload} disabled={isUploading}>
                메인이미지 업로드
            </Button>
            
            <Button onClick={() => navigate('/')}>로그인페이지로 돌아가기</Button>
        </Container>
    );
};

export default MainImageUpload;
