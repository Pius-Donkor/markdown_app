import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";

const listStyles = css`
  cursor: pointer;
`;
const StyledContainer = styled.div`
  ${({ isList }) => (isList ? listStyles : "")}
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: ${({ isList }) =>
    isList ? "transparent" : "solid var(--color-grey-0) 1.5px"};
  padding-left: ${({ isList }) => (isList ? "0" : "10px")};
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  border: transparent;
  background-color: transparent;
  font-size: var(--font-size-medium);
  color: var(--color-white-100);
  padding: 5px 0px;
  outline: none;
  min-width: 15rem;
  transition: border-bottom 0.2s ease;
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
  notInput,
  date = false,
  currentDocument = "",
  handleNameChange = () => {},
  documentName,
  onClick = () => {},
  isList = false,
}) {
  return (
    <StyledContainer isList={isList} onClick={onClick}>
      {notInput ? (
        <>
          <Icon type="small" src="/assets/icon-document.svg" />
          <StyledInputContainer>
            <StyledSpan>{date}</StyledSpan>
            <StyledName>{documentName}</StyledName>
          </StyledInputContainer>
        </>
      ) : (
        <>
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
        </>
      )}
    </StyledContainer>
  );
}
