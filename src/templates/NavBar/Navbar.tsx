import {
  Logo,
  NavLinkStyled,
  NavMenu,
  NavMenuItem,
  NavbarContainer,
} from './NavBar.styled';

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
          {/* Incoming Feature
          <NavLinkStyled to="/login" aria-label="Login">
            Login
          </NavLinkStyled> */}
        </NavMenuItem>
      </NavMenu>
    </NavbarContainer>
  );
};
