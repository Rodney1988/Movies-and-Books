import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
`;

export const Logo = styled(NavLink)`
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
`;

export const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const NavMenuItem = styled.li`
  margin: 0 15px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: lightblue;
  }

  &.active {
    font-weight: bold;
    color: lightblue;
  }
`;
