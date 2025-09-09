import LayOut from '../util/Layout';
import styled from 'styled-components';
import InfoEntity from '../atoms/InfoEntity';
import Color from '../util/Color';
import { DinamicStreakBox } from '../block/streak/DinamicStreakBox';
import StreakInformation from '../block/streak/StreakInformation';

const exampleData = [
  { date: '2025-01-01', count: 1 },
  { date: '2025-01-02', count: 1 },
  { date: '2025-01-03', count: 2 },
  { date: '2025-01-04', count: 0 },
  { date: '2025-01-05', count: 3 },
  { date: '2025-01-06', count: 0 },
  { date: '2025-01-07', count: 1 },
  { date: '2025-01-08', count: 2 },
  { date: '2025-01-09', count: 1 },
  { date: '2025-01-10', count: 0 },
  { date: '2025-01-11', count: 4 },
  { date: '2025-01-12', count: 3 },
  { date: '2025-01-13', count: 2 },
  { date: '2025-01-14', count: 0 },
  { date: '2025-01-15', count: 1 },
  { date: '2025-01-16', count: 1 },
  { date: '2025-01-17', count: 2 },
  { date: '2025-01-18', count: 2 },
  { date: '2025-01-19', count: 1 },
  { date: '2025-01-20', count: 0 },
  { date: '2025-01-21', count: 3 },
  { date: '2025-01-22', count: 1 },
  { date: '2025-01-23', count: 0 },
  { date: '2025-01-24', count: 2 },
  { date: '2025-01-25', count: 1 },
  { date: '2025-01-26', count: 2 },
  { date: '2025-01-27', count: 0 },
  { date: '2025-01-28', count: 1 },
  { date: '2025-01-29', count: 2 },
  { date: '2025-01-30', count: 2 },
  { date: '2025-01-31', count: 1 },
  // ... 생략된 부분 ...
  { date: '2025-04-30', count: 1 },
  { date: '2025-05-01', count: 3 },
  { date: '2025-05-02', count: 2 },
  { date: '2025-05-03', count: 1 },
];

const Up = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Devider = styled.div`
  width: 98%;
  border-bottom: 1px solid ${Color.primary};
  margin-top: -1px;
  margin-left: 12px;
  @media (max-width: 480px) {
    width: 92%;
  }
`;

const Down = styled.div`
  margin-top: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 557px;
`;

const TestPage = () => {
  return (
    <LayOut>
      <Wrapper>
        <Up>
          <InfoEntity handle="ghwo336" div={1} tier={13} />
          <Devider></Devider>
        </Up>
        <Down>
          <DinamicStreakBox data={exampleData} />
        </Down>
        <StreakInformation />
      </Wrapper>
    </LayOut>
  );
};

export default TestPage;
