import React, { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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

  return (
    <div>
      <h2>로그인</h2>
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
  );
};

export default Login;
