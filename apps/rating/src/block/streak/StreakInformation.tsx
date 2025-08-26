import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const Card = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 100%;
`;

const Up = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
`;

const Down = styled.div`
  display: flex;
  align-items: center;
`;
const Number = styled.div`
  font-size: 24px;
  line-height: 1.5;
  font-weight: 700;
`;
const Days = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
`;

const Devider = styled.div`
  height: 50px;
  width: 1px;
  background-color: #dedeeb;
`;

const StreakInformation = () => {
  return (
    <Wrapper>
      <Card>
        <Up>누적</Up>
        <Down>
          <Number>192</Number>
          <Days>days</Days>
        </Down>
      </Card>
      <Devider></Devider>
      <Card>
        <Up>이번시즌</Up>
        <Down>
          <Number>40</Number>
          <Days>days</Days>
        </Down>
      </Card>
    </Wrapper>
  );
};

export default StreakInformation;
