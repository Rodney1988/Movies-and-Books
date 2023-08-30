import styled from '@emotion/styled';
import { ImageProps } from '../../types/types';

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

export const StyledHr = styled.hr`
  width: 90%;
  border: 3px solid white;
  border-radius: 20px;
  transform: translateY(-12px);
`;

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

export const StyledTopSection = styled.section`
  display: flex;
  margin: 5px 0 20px 0;
`;

export const StyledMidSection = styled.section`
  display: flex;
  margin: 5px 0 20px 0;
`;

export const StyledBotSection = styled.section`
  display: flex;
  margin-left: 20px;
  width: 100%;
`;

export const StyledMainSectionContainer = styled.section`
  font-family: monospace;
  color: white;
  height: 100%;
  width: 100%;
  pre {
    margin: 2px 0px;
    text-wrap: wrap;
  }
`;
export const StyledInfoSection = styled.section`
  color: white;
  height: 100%;
  max-height: 300px;
  padding-left: 20px;
  overflow: scroll;
  width: 50%;
  h4 {
    font-style: italic;
  }
  @media only screen and (max-width: 440px) {
    width: 100%;
  }
`;

export const StyledImageSection = styled.section<ImageProps>`
  width: 40%;
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
  @media only screen and (max-width: 440px) {
    width: 35%;
    margin-right: 20px;
  }
`;

export const StyledSubInfoSection = styled.section`
  color: white;
  width: 50%;
  max-height: 500px;
  overflow: scroll;
  padding-left: 20px;
  @media only screen and (max-width: 360px) {
    width: 100%;
  }
`;

export const StyledVideoSection = styled.section`
  @media only screen and (max-width: 445px) {
    padding-right: 10px;
  }
  @media only screen and (max-width: 360px) {
    display: none;
  }
`;

export const StyledDescriptionSection = styled.section`
  padding: 0 0 20px 0;
  width: 90%;
  overflow: scroll;
`;
