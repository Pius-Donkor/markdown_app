import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import DocumentInput from "./DocumentInput";
import Button from "./Button";

// navbar
const StyledNavbar = styled.nav`
  background-color: var(--color-dark-200);
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  transition: margin-left 0.3s ease;
  width: 100vw;
  margin-left: ${({ shifted }) => (shifted ? "250px" : "0")};
`;

// image tag for  the icons
const OpenCloseIcon = styled.img`
  width: ${({ open }) => (open ? "30px" : "25px")};
`;

// markdown heading
const StyledHeading = styled.span`
  color: var(--color-white-0);
  letter-spacing: var(--char-spacing);
  font-size: var(--font-size-small);
  text-transform: uppercase;
  font-weight: var(--text-bold);
`;

// button for containing icons
const ButtonIcon = styled.button`
  background-color: var(--color-dark-300);
  height: 4rem;
  width: 4.5rem;
  border: none;
  cursor: pointer;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
`;

export default function Navbar({
  sidebarVisible,
  currentDocument,
  setSidebarVisible,
  handleDelete,
  handleSave,
  handleNameChange,
}) {
  console.log(sidebarVisible);
  return (
    <StyledNavbar shifted={sidebarVisible}>
      <SubContainer>
        <ButtonIcon onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? (
            <OpenCloseIcon
              src="/public/assets/icon-close.svg"
              alt="OpenCloseIcon"
            />
          ) : (
            <OpenCloseIcon
              src="/assets/icon-menu.svg"
              alt="OpenCloseIcon"
              open
            />
          )}
        </ButtonIcon>
        <StyledHeading>Markdown</StyledHeading>
        {currentDocument && (
          <DocumentInput
            currentDocument={currentDocument}
            handleNameChange={handleNameChange}
          />
        )}
      </SubContainer>

      <div>
        {currentDocument && (
          <SubContainer>
            <Icon
              style={{ color: "var(--color-grey-300)" }}
              src="/public/assets/icon-delete.svg"
              onClick={handleDelete}
            />
            <Button onClick={handleSave}>
              <Icon src="/public//assets/icon-save.svg" /> Save change
            </Button>
          </SubContainer>
        )}
      </div>
    </StyledNavbar>
  );
}
