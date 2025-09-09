import { useAtom } from 'jotai';
import styled from 'styled-components';
import { DivData, hitingDataAtom } from '../store/Atom';
import Color from '../util/Color';
import ArrowButton from '../atoms/ArrowButton';
import DivNameTack from './DivNameTack';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  border-radius: 28px;
  background-color: ${Color.skybox};
  min-height: 300px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 3%;
  display: flex;
  justify-content: center;
`;

const TackContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const HitingBox = ({ divNum }: { divNum: number }) => {
  const [hitingData] = useAtom(hitingDataAtom);

  const divList: DivData[] =
    divNum === 1
      ? hitingData.div1Ranking
      : divNum === 2
        ? hitingData.div2Ranking
        : hitingData.div3Ranking || [];

  return (
    <Wrapper>
      <ButtonWrapper>
        <ArrowButton divNum={divNum} />
      </ButtonWrapper>
      <TackContainer>
        {divList.map((item, index) => (
          <DivNameTack
            key={index}
            rank={index + 1}
            id={item.bojHandle}
            tier={item.tier}
            totalHiting={item.totalScore}
          />
        ))}
      </TackContainer>
    </Wrapper>
  );
};

export default HitingBox;
