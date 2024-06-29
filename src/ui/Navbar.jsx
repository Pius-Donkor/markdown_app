import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: margin-left 0.3s ease;
  margin-left: ${({ shifted }) => (shifted ? "250px" : "0")};
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function Navbar({
  sidebarVisible,
  currentDocument,
  setSidebarVisible,
  setDocuments,
  saveToLocalStorage,
  documents,
  input,
  setCurrentDocument,
}) {
  const handleSave = () => {
    if (currentDocument) {
      const updatedDocuments = documents.map((doc) =>
        doc === currentDocument ? { ...currentDocument, content: input } : doc
      );
      setDocuments(updatedDocuments);
      saveToLocalStorage(updatedDocuments);
    }
  };
  const handleDelete = () => {
    const updatedDocuments = documents.filter((doc) => doc !== currentDocument);
    setDocuments(updatedDocuments);
    saveToLocalStorage(updatedDocuments);
    setCurrentDocument(null);
  };
  return (
    <StyledNavbar shifted={sidebarVisible}>
      <span>Markdown Editor</span>
      {currentDocument && <span>Current Document: {currentDocument.name}</span>}
      <div>
        {currentDocument && (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )}
        <Button onClick={() => setSidebarVisible(!sidebarVisible)}>
          Toggle Sidebar
        </Button>
      </div>
    </StyledNavbar>
  );
}
