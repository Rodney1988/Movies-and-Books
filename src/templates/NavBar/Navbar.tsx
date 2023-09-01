import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  StyledLogo,
  StyledNavLinkStyled,
  StyledNavMenu,
  StyledNavMenuItem,
  StyledNavbarContainer,
  StyledHamburgerMenu,
  StyledHamburgerBottom,
  StyledHamburgerUl,
  StyledHamburgerLi,
} from './NavBar.styled';

export const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <StyledNavbarContainer>
      <StyledLogo to="/" aria-label="Home">
        Movies & Books
      </StyledLogo>
      <StyledNavMenu>
        <StyledNavMenuItem>
          <StyledNavLinkStyled to="/" aria-label="Home">
            Home
          </StyledNavLinkStyled>
        </StyledNavMenuItem>
      </StyledNavMenu>
      <StyledHamburgerMenu onClick={() => setIsExpanded(!isExpanded)}>
        <MenuIcon />
        {isExpanded && (
          <StyledHamburgerBottom>
            <StyledHamburgerUl>
              <StyledHamburgerLi style={{ margin: '12px 0' }}>
                <StyledNavLinkStyled to="/" aria-label="Home">
                  Home
                </StyledNavLinkStyled>
              </StyledHamburgerLi>
            </StyledHamburgerUl>
          </StyledHamburgerBottom>
        )}
      </StyledHamburgerMenu>
    </StyledNavbarContainer>
  );
};
