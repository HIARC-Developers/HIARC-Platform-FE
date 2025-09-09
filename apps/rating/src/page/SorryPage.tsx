import LayOut from '../util/Layout';
import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
`;

export const Contents = styled.div`
  font-weight: 400;
  font-size: 20px;
  margin-top: 40px;
`;

export const SorryPage = () => {
  return (
    <LayOut>
      <Title>하이팅 서비스 점검중입니다.</Title>
      <Contents>다음학기에 다시 찾아와주세요!</Contents>
    </LayOut>
  );
};
