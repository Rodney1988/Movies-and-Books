import styled from '@emotion/styled';
import { Open } from '../../types/types';
const leatherLocalUrl = require('../../assets/book_leather.png');
const cornerUrl = require('../../assets/gold_corner.png');

export const StyledCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledFrontStyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  height: 100%;
`;

export const StyledMoreInfoP = styled.p`
  position: absolute;
  bottom: 0;
  right: 20px;
`;

export const StyledBookWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  min-height: 475px;
  height: 100%;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background: #d4c6b0; //paper color
  margin-top: 50px;
  box-shadow: 0px -10px 10px -5px rgba(0, 0, 0, 0.25),
    0px 10px 10px -5px rgba(0, 0, 0, 0.5), 5px 0 5px -2px rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.1) 0px -50px 136px -28px inset;
  perspective: 8000px;
  color: black;
  :hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    max-width: 250px;
  }
`;

export const StyledFrontCover = styled.div<{ isOpen: boolean }>`
  color: white;
  position: absolute;
  width: 89%;
  height: 100%;
  left: 49px;
  transform: ${({ isOpen }) =>
    isOpen ? 'rotateY(-160deg)' : 'rotateY(-5deg)'};
  transform-style: preserve-3d;
  transform-origin: left;
  transition: transform 0.6s;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  backgroundColor: brown;
  background: url("${leatherLocalUrl}");
  box-shadow: ${({ isOpen }) =>
    isOpen
      ? `0px -10px 10px -5px rgba(0, 0, 0, 0.5),
      0px 10px 10px -5px rgba(0, 0, 0, 0.5),
      -5px 0 5px -5px #000000d1,
      rgba(0, 0, 0, 0.1) 0px -50px 136px -28px inset;`
      : `-5px 0 5px -5px #00000078, 5px 0 5px -2px rgba(0, 0, 0, 0.5);`} 
  font-weight: normal;
  font-family: 'Courgette', cursive;
  :hover {
    cursor: pointer;
  }
`;

export const StyledBackCover = styled.div<Open>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: url('${leatherLocalUrl}');
  transform-style: preserve-3d;
  transform-origin: left;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 15px 0 15px rgb(0 0 0 / 22%) inset;
  transform: translateZ(-1px);
`;

export const StyledInsideWrapper = styled.div`
  font-family: 'Courgette', cursive;
  height: 100%;
  width: 100%;
  max-width: 400px;
  font-size: 22px;
  left: 5%;
  display: flex;
  justify-content: center;
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 75px;
  margin-bottom: 15px;
  & > h3,
  h5 {
    margin: 15px 0px;
    text-decoration: underline;
  }
  & > p {
    margin: 5px 0px;
  }
`;

export const StyledCorner = styled.div`
  position: absolute;
  right: -2.5px;
  top: 0;
  width: 30%;
  height: 30%;
  background-image: url('${cornerUrl}');
  background-size: contain;
  background-repeat: no-repeat;
`;
