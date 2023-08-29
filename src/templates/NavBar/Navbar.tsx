import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const NavMenuItem = styled.li`
  margin: 0 15px;
`;

const NavLinkStyled = styled(NavLink)`
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

export const NavBar = () => {
  return (
    <NavbarContainer>
      <Logo to="/" aria-label="Home">
        Movies & Books
      </Logo>
      <NavMenu>
        <NavMenuItem>
          <NavLinkStyled to="/" aria-label="Home">
            Home
          </NavLinkStyled>
        </NavMenuItem>
        <NavMenuItem>
          <NavLinkStyled to="/about" aria-label="About">
            About
          </NavLinkStyled>
        </NavMenuItem>
      </NavMenu>
    </NavbarContainer>
  );
};
