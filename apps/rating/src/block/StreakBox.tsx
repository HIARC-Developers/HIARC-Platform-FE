import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Color from '../util/Color';
import IndividualBlock from '../components/IndividualBlock';
import StreakBoxArrowButton from '../components/StreakBoxArrowButton';
import { hitingDataAtom, loadingAtom } from '../store/Atom';

const Wrapper = styled.div`
  width: 725px;
  border-radius: 28px;
  background-color: ${Color.skybox};
  min-height: 342px;
  min-width: 320px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 320px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

const Individuals = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
  flex-grow: 1;
  padding: 12px 18px;
`;

const StreakBox = () => {
  const [hitingData] = useAtom(hitingDataAtom);
  const [loading] = useAtom(loadingAtom);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const streakList = hitingData.streakRanking?.slice(0, 6) || [];
  const displayedBlocks = isMobile ? streakList.slice(0, 4) : streakList;

  return (
    <Wrapper>
      <ButtonWrapper>
        <StreakBoxArrowButton />
      </ButtonWrapper>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</p>
      ) : (
        <Individuals>
          {displayedBlocks.map((streak) => (
            <IndividualBlock
              key={streak.bojHandle}
              tier={streak.tier}
              handle={streak.bojHandle}
              divNum={streak.div}
              totalStreak={streak.currentTotalStreak}
              startDate={streak.streakStartAt}
            />
          ))}
        </Individuals>
      )}
    </Wrapper>
  );
};

export default StreakBox;
