import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import LayOut from '../util/Layout';
import DivToggleBar from '../components/DivToggleBar';
import RankingContainer from '../block/RankingContainer';
import { useSearchParams } from 'react-router-dom';
import DonutChart from '../atoms/DounutChart';
import { fetchRankingData } from '../api/RankingApi';
import Color from '../util/Color';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimatedContainer = styled.div<{ $animate: boolean; $duration?: string }>`
  opacity: 0;
  animation: ${({ $animate }) => ($animate ? fadeIn : 'none')}
    ${({ $duration }) => $duration || '0s'} ease-in-out forwards;
`;
const HeadWrapper = styled.div`
  font-size: 35px;
  font-weight: 900;
  padding-bottom: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin-left: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 45px;
`;

const MainWrapper = styled.div`
  display: flex;
  gap: 26px;
  margin-bottom: 40px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20.65px;
  @media (max-width: 480px) {
    display: none;
  }
`;

const Explain = styled.div`
  font-size: 12px;
  color: ${Color.graySub3};
  @media (max-width: 480px) {
    margin-bottom: 20px;
    margin-left: 10px;
  }
`;

const DivPage = () => {
  const [selected, setSelected] = useState<number>(0);
  const [animate, setAnimate] = useState(false);
  const [searchParams] = useSearchParams();
  const [streakRatio, setStreakRatio] = useState<number | null>(null);
  const [rankingData, setRankingData] = useState<
    {
      num: number;
      bojHandle: string;
      tier: number;
      today: number;
      total: number;
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const numParam = searchParams.get('num');
    if (numParam) {
      setSelected(Number(numParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRankingData(selected);
        if (Array.isArray(data.rankingData)) {
          setRankingData(data.rankingData);
        } else {
          setRankingData([]);
        }
        setStreakRatio(data.graphData || 0);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류 발생');
        setRankingData([]);
        setStreakRatio(0);
      }
    };
    fetchData();
  }, [selected]);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [selected]);

  return (
    <LayOut>
      <HeadWrapper>Ranking</HeadWrapper>
      <Explain>* 점수는 15분 안으로 반영됩니다.</Explain>
      <ButtonWrapper>
        <DivToggleBar selected={selected} setSelected={setSelected} />
      </ButtonWrapper>
      <MainWrapper>
        <AnimatedContainer $animate={animate} $duration="1s">
          <RankingContainer rankingData={rankingData} error={error} />
        </AnimatedContainer>
        <Right>
          <AnimatedContainer $animate={animate} key={selected} $duration="2s">
            {streakRatio !== null ? (
              <DonutChart
                key={selected}
                value={isNaN(streakRatio) ? 0 : streakRatio}
                div={selected}
                duration={isNaN(streakRatio) ? 0 : streakRatio * 2}
              />
            ) : (
              <div>Loading...</div>
            )}
          </AnimatedContainer>
        </Right>
      </MainWrapper>
    </LayOut>
  );
};

export default DivPage;
