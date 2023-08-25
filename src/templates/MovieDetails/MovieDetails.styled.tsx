import styled from '@emotion/styled';
import { ImageProps, RowNumber } from '../../types/types';

export const StyledCenterChildrenDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 75px;
`;

export const StyledCenterChildrenSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const StyledCellContainer = styled.section`
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 5px;
`;

export const StyledHr = styled.hr<RowNumber>`
  width: 100%;
  grid-row: ${({ number }) => number};
  grid-column: 1 / 3;
  border: 3px solid white;
  border-radius: 20px;
  transform: translateY(-2px);
`;

export const StyledGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2);
  gap: 0px;
  color: white;
  font-family: monospace;
  width: 85%;
  gap: 0px;
`;

export const CellOneRowOne = styled.section<ImageProps>`
  position: relative;
  display: flex;
  grid-column: 1 / 2;
  grid-row: 1;
  width: 100%;
  min-height: 160px;
  // border: 1px solid blue;
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
`;

export const CellTwoRowOne = styled.section`
  display: flex;
  position: relative;
  grid-column: 2 / 2;
  grid-row: 1;
  width: 100%;
`;

export const CellOneRowTwo = styled.section`
  display: flex;
  grid-column: 1 / 1;
`;

export const CellTwoRowTwo = styled.section`
  display: flex;
  grid-column: 2 / 3;
`;

export const CellOneRowThree = styled.section`
  display: flex;
  grid-column: 1 / 3;
  :last-child {
    margin-bottom: 20px;
  }
`;

// export const StyledVerticalDivisor = styled.section`
//   position: absolute;
//   right: -15px;
//   height: 105%;
//   top: 0;
//   margin: 0 15px 0 15px;
//   border: 4px solid white;
//   border-radius: 20px;
//   transform: translateY(-7px);
// `;

export const StyledClapperContainer = styled.div`
  background-color: #111;
  height: 100%;
  min-height: 500px;
  width: 100%;
  max-width: 650px;
  border-radius: 15px;
  position: relative;
  transition: transform 1s ease-in-out;
  :hover {
    & > div {
      transform: rotate(-40deg);
    }
  }
`;

export const StyledClapperPiece = styled.div`
  background: repeating-linear-gradient(
    120deg,
    #111 0%,
    #111 10%,
    #fff 10%,
    #fff 20%
  );

  height: 65px;
  width: 100%;
  max-width: 660px;
  position: absolute;
  top: 0;
  border-radius: 15px;
  transform: translateY(-15px);
  transition: transform 0.5s ease-in-out;
  transform-origin: left;
  box-shadow: 0 4px 2px -2px #5a434354;
`;

export const StyledStyledClapperPieceBottom = styled.section`
  background: repeating-linear-gradient(
    45deg,
    #111 0%,
    #111 10%,
    #fff 10%,
    #fff 20%
  );
  height: 94px;
  width: 100%;
  max-width: 660px;
  border-top-right-radius: 15px;
  box-shadow: 0 4px 2px -2px #302b2beb;
`;

export const StyledTriangle = styled.section`
  transform: translate(0, -3px);
  position: relative;
  width: 130px;
  height: 98px;
  border-radius: 15px 100% 5px 5px;
  background-color: #372f2e;
  box-shadow: 0 4px 8px black;
`;

export const CircleOne = styled.section`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background: gray;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;

export const CircleTwo = styled.section`
  position: absolute;
  bottom: 6px;
  left: 6px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background: gray;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;

export const CircleThree = styled.section`
  position: absolute;
  bottom: 6px;
  right: 10px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background: gray;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;
