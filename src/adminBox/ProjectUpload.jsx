import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore"; // getDoc으로 기존 문서 조회
import { storage, db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 32px;
    color: #2c3e50;
    font-weight: bold;
    text-transform: uppercase;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Textarea = styled.textarea`
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    margin: 10px 0;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: center;
    
    &:hover {
        background-color: #45a049;
    }
`;

const FileInput = styled.input`
    margin: 10px 0;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    margin-top: 10px;
`;

const TeamMemberContainer = styled.div`
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
`;

const RemoveButton = styled.button`
    background-color: #ff0000;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #cc0000;
    }
`;

const AddButton = styled.button`
    background-color: #007BFF;
    color: white;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    margin-bottom: 50px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const ProjectUpload = () => {
    const [projectId, setProjectId] = useState('');
    const [teamMembers, setTeamMembers] = useState([
        { name: "", englishName: "", department: "", email: "", instagram: "", profilePic: null }
    ]);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [vimeoLink, setVimeoLink] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [infoImage, setInfoImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.userId) {
            const userId = location.state.userId;
            setProjectId(userId);
            fetchProjectData(userId); // 로그인한 사용자에 해당하는 프로젝트 데이터 불러오기
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    const fetchProjectData = async (userId) => {
        try {
            const projectRef = doc(db, "projects", userId);
            const projectSnap = await getDoc(projectRef);

            if (projectSnap.exists()) {
                const projectData = projectSnap.data();
                setTitle(projectData.title || "");
                setSubtitle(projectData.subtitle || "");
                setDescription(projectData.description || "");
                setVimeoLink(projectData.vimeoLink || "");

                setTeamMembers(projectData.teamMembers || [
                    { name: "", englishName: "", department: "", email: "", instagram: "", profilePic: null }
                ]);
                setThumbnail(null); // 기존 URL을 불러올 수 있지만 다시 업로드 받는 것이 안전
                setMainImage(null);
                setInfoImage(null);
            }
        } catch (error) {
            console.error("프로젝트 데이터를 불러오는 중 오류 발생: ", error);
        }
    };

    const handleTeamMemberChange = (index, field, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    const addTeamMember = () => {
        setTeamMembers([
            ...teamMembers,
            { name: "", englishName: "", department: "", email: "", instagram: "", profilePic: null }
        ]);
    };

    const removeTeamMember = (index) => {
        const updatedMembers = [...teamMembers];
        updatedMembers.splice(index, 1);
        setTeamMembers(updatedMembers);
    };

    const handleFileChange = (setter) => (e) => {
        if (e.target.files[0]) {
            setter(e.target.files[0]);
        }
    };

    const validateForm = () => {
        if (!title || !subtitle || !description || !vimeoLink || !thumbnail || !mainImage || !infoImage) {
            alert("모든 필드를 채워주세요.");
            return false;
        }

        for (let i = 0; i < teamMembers.length; i++) {
            const member = teamMembers[i];
            if (!member.name || !member.englishName || !member.department || !member.email || !member.instagram) {
                alert("모든 팀원 정보를 채워주세요.");
                return false;
            }
        }

        return true;
    };

    const handleUpload = async () => {
        if (!validateForm()) return;

        setIsUploading(true); // 업로드 중 상태

        try {
            const imageUrls = {};

            if (thumbnail) {
                const thumbnailRef = ref(storage, `projects/${projectId}/thumbnail.jpg`);
                const snapshot = await uploadBytesResumable(thumbnailRef, thumbnail);
                imageUrls.thumbnail = await getDownloadURL(snapshot.ref);
            }

            if (mainImage) {
                const mainImageRef = ref(storage, `projects/${projectId}/mainImage.jpg`);
                const snapshot = await uploadBytesResumable(mainImageRef, mainImage);
                imageUrls.mainImage = await getDownloadURL(snapshot.ref);
            }

            if (infoImage) {
                const infoImageRef = ref(storage, `projects/${projectId}/infoImage.jpg`);
                const snapshot = await uploadBytesResumable(infoImageRef, infoImage);
                imageUrls.infoImage = await getDownloadURL(snapshot.ref);
            }

            const teamMembersWithProfilePics = await Promise.all(
                teamMembers.map(async (member, index) => {
                    if (member.profilePic) {
                        const profilePicRef = ref(storage, `projects/${projectId}/team/${index}_profilePic.jpg`);
                        const snapshot = await uploadBytesResumable(profilePicRef, member.profilePic);
                        const profilePicURL = await getDownloadURL(snapshot.ref);

                        return {
                            ...member,
                            profilePic: profilePicURL
                        };
                    } else {
                        return member;
                    }
                })
            );

            await setDoc(doc(db, "projects", projectId), {
                projectId,
                teamMembers: teamMembersWithProfilePics,
                title,
                subtitle,
                description,
                vimeoLink,
                images: imageUrls,
            });

            alert("프로젝트가 성공적으로 업로드되었습니다!");
            navigate('/');
        } catch (error) {
            console.error("업로드 중 에러 발생:", error);
            alert("업로드 중 문제가 발생했습니다.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Container>
            <Title>팀 프로젝트 업로드</Title>

            {isUploading && (
                <div style={{ textAlign: 'center' }}>
                    <img src={"loading.gif"} alt="업로드 중" />
                    <p>업로드 중입니다. 잠시만 기다려주세요...</p>
                </div>
            )}

            {!isUploading && (
                <>
                    <Input
                        type="text"
                        placeholder="프로젝트 ID"
                        value={projectId}
                        readOnly
                    />
                    <Input
                        type="text"
                        placeholder="프로젝트 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="프로젝트 서브타이틀"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="프로젝트 설명"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <h2 style={{marginBottom:'20px'}}>팀원 정보 (팀작일 경우에만 팀원추가 버튼 클릭)</h2>
                    {teamMembers.map((member, index) => (
                        <TeamMemberContainer key={index}>
                            <Input
                                type="text"
                                placeholder="팀원 이름"
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="팀원 영어 이름 ex) Suk Sanghyeon"
                                value={member.englishName}
                                onChange={(e) => handleTeamMemberChange(index, "englishName", e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="팀원 학과 ex) 산업디자인공학과 or 미디어디자인공학과"
                                value={member.department}
                                onChange={(e) => handleTeamMemberChange(index, "department", e.target.value)}
                            />
                            <Input
                                type="email"
                                placeholder="팀원 이메일"
                                value={member.email}
                                onChange={(e) => handleTeamMemberChange(index, "email", e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="팀원 인스타그램 (없을 경우 - 입력)"
                                value={member.instagram}
                                onChange={(e) => handleTeamMemberChange(index, "instagram", e.target.value)}
                            />
                            <Label>팀원 프로필 사진 추가</Label>
                            <FileInput
                                type="file"
                                onChange={(e) => handleTeamMemberChange(index, "profilePic", e.target.files[0])}
                            />
                            {teamMembers.length > 1 && (
                                <RemoveButton type="button" onClick={() => removeTeamMember(index)}>
                                    - 팀원 제거
                                </RemoveButton>
                            )}
                        </TeamMemberContainer>
                    ))}

                    <AddButton onClick={addTeamMember}>+ 팀원 추가</AddButton>

                    <h3>프로젝트 이미지</h3>
                    <Label>썸네일 이미지 추가</Label>
                    <FileInput type="file" onChange={handleFileChange(setThumbnail)} />
                    <Label>메인 이미지 추가</Label>
                    <FileInput type="file" onChange={handleFileChange(setMainImage)} />
                    <Label>설명 이미지 추가</Label>
                    <FileInput type="file" onChange={handleFileChange(setInfoImage)} />

                    <h3>비메오 링크</h3>
                    <Input
                        type="url"
                        placeholder="비메오 링크"
                        value={vimeoLink}
                        onChange={(e) => setVimeoLink(e.target.value)}
                    />

                    <Button onClick={handleUpload} disabled={isUploading}>
                        프로젝트 업로드
                    </Button>

                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {description}
                    </div>
                </>
            )}
        </Container>
    );
};

export default ProjectUpload;
