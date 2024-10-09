import React, { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [userId2, setUserId2] = useState('');
    const [password2, setPassword2] = useState('');
    const [error2, setError2] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // 에러 초기화

        try {
            // Firestore에서 ID로 사용자 정보 가져오기
            const userDoc = await getDoc(doc(db, 'users', userId));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.password === password) {
                    // 비밀번호가 일치하면 userId를 state로 넘기면서 업로드 페이지로 이동
                    navigate('/upload', { state: { userId: userId } });
                } else {
                    setError('비밀번호가 잘못되었습니다.');
                }
            } else {
                setError('존재하지 않는 사용자 ID입니다.');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            setError('로그인 중 문제가 발생했습니다.');
        }
    };

    const handleLogin2 = async (e) => {
        e.preventDefault();
        setError2(null); // 에러 초기화

        try {
            // Firestore에서 ID로 사용자 정보 가져오기
            const userDoc2 = await getDoc(doc(db, 'users', userId2));

            if (userDoc2.exists()) {
                const userData = userDoc2.data();
                if (userData.password === password2) {
                    // 비밀번호가 일치하면 userId를 state로 넘기면서 업로드 페이지로 이동
                    navigate('/main_image_upload', { state: { userId: userId2 } });
                } else {
                    setError2('비밀번호가 잘못되었습니다.');
                }
            } else {
                setError2('존재하지 않는 사용자 ID입니다.');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            setError2('로그인 중 문제가 발생했습니다.');
        }
    };

    return (
        <div>
            <div style={{ backgroundColor: '#F4B8C0', borderColor: '#E47080', borderStyle: 'dashed', borderWidth: '10px', margin: '10px', padding: '20px' }}>
                <h2>메인 이미지 포함 다른 내용도 수정 원할 시 빨간박스 로그인</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">로그인</button>
                </form>
            </div>
            <div style={{ backgroundColor: '#A8D5EF', borderColor: '#3682B4', borderStyle: 'dashed', borderWidth: '10px', margin: '10px', padding: '20px' }}>
                <h1 style={{ color: 'red' }}> 아래 로그인 후 {'"'}메인 이미지{'"'}만 재업로드</h1>
                <h2 style={{ color: 'red' }}>※ 피그마에서 메인 이미지 픽셀 수를 두배로 뽑아서 제출</h2>
                <h2 style={{ color: 'red' }}> ex{')'} 1920 700 -{'>'} 3840 1400 </h2>
                {error2 && <p style={{ color: 'red' }}>{error2}</p>}
                <form onSubmit={handleLogin2}>
                    <input
                        type="text"
                        placeholder="ID"
                        value={userId2}
                        onChange={(e) => setUserId2(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <button type="submit">로그인</button>
                </form>
            </div>

        </div>
    );
};

export default Login;
