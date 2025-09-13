import styled from 'styled-components';
import Color from '../../util/Color';
import { useState } from 'react';
import { getAdminHandleStats } from '../../api/AdminApi';
import { blockNameToCode } from '../../util/CheckAdminName';
import { Modal } from '../Modal';
const Wrapper = styled.div`
  overflow: visible;
`;
const InputBox = styled.div`
  background-color: ${Color.yellowBackground};
  width: 454px;
  height: 60px;
  display: flex;
  gap: 40px;
  align-items: center;
`;
const Input = styled.input`
  height: 30px;
  width: 70%;
  background-color: inherit;
  border: none;
  margin-top: 10px;
  box-sizing: border-box;
  resize: none;
  font-size: 20px;
  margin-left: 10px;
`;
const Button = styled.button`
  background-color: #ffa5a5;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0af;
  }
`;

export const AdminInputBox = ({ blockName }: { blockName: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [handle, setHandle] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(e.target.value);
  };
  const onClick = async () => {
    try {
      console.log(handle);
      const response = await getAdminHandleStats(
        blockNameToCode[blockName] as 'solved-level' | 'hiting',
        handle
      );
      if (response) {
        // 핸들별 유저 정보 확인하기인 경우 response.data를 직접 전달
        const data = blockName === '핸들별 유저 정보 확인하기'
          ? response.data
          : response.data || response;
        setModalContent(data);
        setIsModalOpen(true);
      } else {
        setModalContent('핸들 다시 입력하셈 ㅇㅇ');
        setIsModalOpen(true);
      }
    } catch (err) {
      setModalContent('error 개발팀 문의');
      setIsModalOpen(true);
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <InputBox>
        <Input placeholder="핸들을 입력하세요" value={handle} onChange={handleInputChange} />
        <Button onClick={onClick}>입력하기</Button>
      </InputBox>
      {isModalOpen ? <Modal content={modalContent} onClose={() => setIsModalOpen(false)} /> : ''}
    </Wrapper>
  );
};
