import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // firebase.js에서 storage 가져오기

const ImageUpload = () => {
  const [image, setImage] = useState(null); // 사용자가 선택한 이미지 상태
  const [uploadProgress, setUploadProgress] = useState(0); // 업로드 진행 상태
  const [downloadURL, setDownloadURL] = useState(""); // 업로드 완료 후 다운로드 URL
  const [error, setError] = useState(null); // 에러 상태

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setError(null); // 이전 에러 초기화
    }
  };

  // 업로드 버튼 클릭 시 실행되는 함수
  const handleUpload = () => {
    if (!image) {
      setError("이미지를 선택해주세요.");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`); // Firebase Storage 경로 설정

    // 업로드 실행
    const uploadTask = uploadBytesResumable(storageRef, image);

    // 업로드 상태 추적
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // 진행 상태 업데이트
      },
      (error) => {
        console.error("업로드 실패:", error);
        setError("업로드 중 문제가 발생했습니다.");
      },
      () => {
        // 업로드 완료 시 다운로드 URL 가져오기
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url); // URL 저장
          setImage(null); // 업로드 후 선택한 파일 초기화
        });
      }
    );
  };

  return (
    <div>
      <h2>이미지 업로드</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>

      {uploadProgress > 0 && (
        <p>업로드 진행: {uploadProgress}%</p>
      )}

      {downloadURL && (
        <div>
          <p>업로드 완료! <a href={downloadURL} target="_blank" rel="noopener noreferrer">이미지 보기</a></p>
          <img src={downloadURL} alt="업로드된 이미지" style={{ width: "300px" }} />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
