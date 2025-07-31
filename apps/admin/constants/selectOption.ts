interface SelectData {
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
};
