import React, { useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore'; // Firestore에 문서 저장
import { db } from '../firebase'; // Firestore 설정 불러오기

const UploadUserData = () => {

    // ID와 랜덤 비밀번호 배열
    const users = [
        { id: 'A01', password: 'biyj' },
        { id: 'A02', password: 'pltt' },
        { id: 'A03', password: 'yfll' },
        { id: 'A04', password: 'cgen' },
        { id: 'A05', password: 'yhmj' },
        { id: 'A06', password: 'hcgi' },
        { id: 'A07', password: 'pusa' },
        { id: 'A08', password: 'icza' },
        { id: 'A09', password: 'giqr' },
        { id: 'A10', password: 'oypt' },
        { id: 'A11', password: 'gbyr' },
        { id: 'A12', password: 'yktj' },
        { id: 'A13', password: 'frfp' },
        { id: 'A14', password: 'xmtf' },
        { id: 'A15', password: 'rtlz' },
        { id: 'A16', password: 'irrn' },
        { id: 'A17', password: 'bauv' },
        { id: 'A18', password: 'anwz' },
        { id: 'A19', password: 'qrxj' },
        { id: 'A20', password: 'xsnq' },
        { id: 'A21', password: 'ulmp' },
        { id: 'A22', password: 'svnn' },
        { id: 'A23', password: 'eoyi' },
        { id: 'E01', password: 'edfz' },
        { id: 'E02', password: 'ujku' },
        { id: 'E03', password: 'qqiu' },
        { id: 'E04', password: 'tuag' },
        { id: 'E05', password: 'ikkt' },
        { id: 'E06', password: 'uytw' },
        { id: 'E07', password: 'bkto' },
        { id: 'E08', password: 'sjrg' },
        { id: 'H01', password: 'xnxa' },
        { id: 'H02', password: 'outt' },
        { id: 'H03', password: 'rgnz' },
        { id: 'H04', password: 'bikm' },
        { id: 'H05', password: 'hzey' },
        { id: 'H06', password: 'geah' },
        { id: 'H07', password: 'ectq' },
        { id: 'I01', password: 'ltdh' },
        { id: 'I02', password: 'vdsd' },
        { id: 'I03', password: 'eypc' },
        { id: 'I04', password: 'hjha' },
        { id: 'I05', password: 'ualz' },
        { id: 'I06', password: 'bzme' },
        { id: 'I07', password: 'gwff' },
        { id: 'I08', password: 'dqvo' },
        { id: 'I09', password: 'qyvo' },
        { id: 'I10', password: 'qhnk' },
        { id: 'I11', password: 'gatx' },
        { id: 'L01', password: 'euvl' },
        { id: 'L02', password: 'gpet' },
        { id: 'L03', password: 'vdms' },
        { id: 'L04', password: 'mvua' },
        { id: 'L05', password: 'kvpp' },
        { id: 'L06', password: 'fzio' },
        { id: 'L07', password: 'zykm' },
        { id: 'L08', password: 'ukil' },
        { id: 'L09', password: 'fohk' },
        { id: 'L10', password: 'esqy' },
        { id: 'L11', password: 'pmia' },
        { id: 'L12', password: 'qocu' },
        { id: 'M01', password: 'amvo' },
        { id: 'M02', password: 'fsdz' },
        { id: 'M03', password: 'gehi' },
        { id: 'M04', password: 'wxep' },
        { id: 'M05', password: 'pcux' },
        { id: 'M06', password: 'zxww' },
        { id: 'M07', password: 'tkos' },
        { id: 'M08', password: 'xfso' },
        { id: 'M09', password: 'akua' },
        { id: 'M10', password: 'fepm' },
        { id: 'M11', password: 'hxrb' },
        { id: 'M12', password: 'udjf' },
        { id: 'M13', password: 'woek' },
        { id: 'M14', password: 'yxsv' },
        { id: 'M15', password: 'jdvc' },

        // 필요한 만큼 추가
    ];

    // Firestore에 배열 데이터 업로드
    const uploadToFirestore = async () => {
        try {
            users.forEach(async (user) => {
                await setDoc(doc(db, 'users', user.id), {
                    password: user.password
                });
                console.log(`${user.id} 사용자의 정보가 Firestore에 저장되었습니다.`);
            });
        } catch (error) {
            console.error('Firestore 업로드 실패: ', error);
        }
    };

    useEffect(() => {
        uploadToFirestore(); // 컴포넌트 마운트 시 Firestore에 업로드
    }, []);

    return (
        <div>
            <h2>사용자 정보 Firestore에 업로드 중...</h2>
        </div>
    );
};

export default UploadUserData;
