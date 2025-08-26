export interface SelectData {
  value: string;
  label: string;
}

export const selectOption: Record<string, SelectData[]> = {
  학년: [
    { value: '1', label: '1학년' },
    { value: '2', label: '2학년' },
    { value: '3', label: '3학년' },
    { value: '4', label: '4학년' },
    { value: '5', label: '5학년 이상' },
  ],
  학과: [
    { value: '컴퓨터공학과', label: '컴퓨터공학과' },
    { value: '정보컴퓨터공학부', label: '정보컴퓨터공학부' },
    { value: '컴퓨터데이터공학부', label: '컴퓨터데이터공학부' },
    { value: '자율전공학부', label: '자율전공학부' },
    { value: '기계시스템디자인공학과', label: '기계시스템디자인공학과' },
    { value: '산업데이터공학과', label: '산업데이터공학과' },
    { value: '시각디자인전공', label: '시각디자인전공' },
    { value: '전자전기공학부', label: '전자전기공학부' },
    { value: '기타', label: '기타' },
  ],
  학기: [
    { value: '25년 1학기', label: '25년 1학기' },
    { value: '25년 2학기', label: '25년 2학기' },
    { value: '26년 1학기', label: '26년 1학기' },
    { value: '26년 2학기', label: '26년 2학기' },
  ],
  카테고리: [
    { value: 'STUDY', label: '스터디' },
    { value: 'RATING', label: '하이팅' },
    { value: 'GENERAL', label: '학회일정' },
    { value: 'EXTERNAL', label: '외부' },
    { value: 'ETC', label: '기타' },
  ],
  신청유형: [
    { value: '신청 없음', label: '신청 없음' },
    { value: '신청', label: '신청' },
    { value: '참석', label: '참석' },
    { value: '참석 및 신청', label: '참석 및 신청' },
  ],
  스터디: [
    { value: '기초스터디', label: '기초스터디' },
    { value: '초급스터디', label: '초급스터디' },
    { value: '중급스터디', label: '중급스터디' },
  ],
  공개여부: [
    { value: '', label: '전체' },
    { value: 'true', label: '공개' },
    { value: 'false', label: '비공개' },
  ],
  회차: Array.from({ length: 30 }, (_, i) => {
    const num = (i + 1).toString();
    return { value: num, label: `${num}회차` };
  }),
  시작시간: Array.from({ length: 16 }, (_, i) => {
    const hour = 4 + Math.floor(i / 2);
    const half = i % 2 === 1;
    const label = `오후 ${hour}시${half ? '반' : ''}`;
    return { value: label, label };
  }),
  모집문구관리: [
    { value: '학회 가입 완료', label: '학회 가입 완료' },
    { value: '안내 사항', label: '안내 사항' },
  ],
  직함: [
    { value: '운영진', label: '운영진' },
    { value: '스터디장', label: '스터디장' },
  ],
};
