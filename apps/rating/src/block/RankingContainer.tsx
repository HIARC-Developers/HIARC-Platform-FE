import styled from 'styled-components';
import RankingContainerExplainBar from '../components/RankingContainerExplainBar';
import RankingEntity from '../components/RankingEntity';

const Wrapper = styled.div`
  width: 673px;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    width: 342px;
  }
`;

interface RankingContainerProps {
  rankingData: {
    num: number;
    bojHandle: string;
    tier: number;
    today: number;
    total: number;
  }[];
  error: string | null;
}

const RankingContiner = ({ rankingData, error }: RankingContainerProps) => {
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <Wrapper>
      <RankingContainerExplainBar />
      {rankingData.map(({ num, bojHandle, tier, today, total }) => (
        <RankingEntity
          key={num}
          ranking={num}
          handle={bojHandle}
          tier={tier}
          today={today}
          total={total}
          event={false} // RankingApi에서 event 필드가 없으므로 기본값으로 설정
        />
      ))}
    </Wrapper>
  );
};

export default RankingContiner;
