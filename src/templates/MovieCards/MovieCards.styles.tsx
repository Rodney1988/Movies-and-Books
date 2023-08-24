import styled from '@emotion/styled';
import { ImageProps } from '../../types/types';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const StyledFieldWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px 15px 0 15px;
`;

export const CardWrapper = styled.div<ImageProps>`
  position: relative;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  color: #fff;
  width: 30%;
  min-width: 300px;
  margin: 10px;
  background: ${({ src }) => `url('${src}')`};
  height: 525px;
  :hover {
    .content {
      transform: translateY(-70px);
    }
    .sub-content {
      transform: translateY(-5px);
    }
  }
`;

export const OverlayDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgb(0 0 0 / 17%), rgba(0, 0, 0, 0.7));
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  color: #fff;
  margin-top: 5px;
  font-weight: 400;
`;

export const DateSpan = styled.span`
  font-size: large;
  margin-right: 4px;
  margin-left: 8px;
  transform: translateY(5px);
`;

export const Content = styled.div`
  padding: 1em;
  height: 175px;
  transition: transform 0.3s ease-in-out;
`;

export const Title = styled.h1`
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
`;

export const SubContent = styled.div`
  transform: translateY(200px);
  transition: transform 0.3s ease-in-out;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  margin-top: 100px;
`;

export const SeeMoreButton = styled.button`
  display: block;
  background: transparent;
  border: none;
  width: 100px;
  margin: 2em auto 1em;
  text-align: center;
  font-size: 12px;
  color: #fff;
  line-height: 1;
  position: relative;
  font-weight: 700;
  transition: transform 0.3s;

  ::after {
    content: '\\2192';
    opacity: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.3s;
  }

  :hover::after {
    transform: translate(5px, -50%);
    opacity: 1;
  }
`;
