import React from "react";
import styled from "styled-components";
import Button from "./Button";
import DocumentInput from "./DocumentInput";

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: var(--color-dark-100);
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(-250px)"};
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 25px;
  z-index: 1000;
`;
const SideBarHeading = styled.p`
  font-size: var(--font-size-medium);
  color: var(--color-grey-100);
  letter-spacing: var(--char-spacing);
  text-transform: uppercase;
  font-weight: var(--text-bold);
  margin-top: 0.5rem;
`;

export default function Sidebar({
  documents,
  sidebarVisible,
  handleCreate,
  handleSelectDocument,
}) {
  return (
    <StyledSidebar visible={sidebarVisible}>
      <SideBarHeading>my documents</SideBarHeading>
      <Button large={true} onClick={handleCreate}>
        + New Document
      </Button>
      {documents.map((doc, index) => (
        <DocumentInput
          isList={true}
          notInput={true}
          key={index}
          documentName={doc.name}
          date={doc.createdAt}
          onClick={() => handleSelectDocument(doc)}
        />
      ))}
    </StyledSidebar>
  );
}
