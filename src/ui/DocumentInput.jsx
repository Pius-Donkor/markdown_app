import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: solid var(--color-grey-0) 1.5px;
  padding-left: 1rem;
`;
const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border: transparent;
  background-color: transparent;
  font-size: var(--font-size-medium);
  color: var(--color-white-100);
  padding: 5px 0px;
  outline: none;
  min-width: 15rem;
  transition: border-bottom 0.2s ease;
  &::placeholder {
    font-size: var(--font-size-medium);
    color: var(--color-white-100);
  }
  &:hover,
  &:focus {
    border-bottom: solid var(--color-white-0) 1.5px;
  }
`;

const StyledSpan = styled.span`
  font-size: var(--font-size-light);
  color: var(--color-grey-100);
`;

export default function DocumentInput({
  currentDocument = "",
  handleNameChange = () => {},
}) {
  return (
    <StyledContainer>
      <Icon type="small" src="/assets/icon-document.svg" />
      <StyledInputContainer>
        <StyledSpan>{currentDocument.name}</StyledSpan>
        <StyledInput
          placeholder={currentDocument.name}
          value={currentDocument.name}
          onChange={handleNameChange}
          type="text"
        />
      </StyledInputContainer>
    </StyledContainer>
  );
}
