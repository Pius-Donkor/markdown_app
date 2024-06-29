import React from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(-250px)"};
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 10px;
  z-index: 1000;
`;

const Preview = styled.div`
  padding: 10px;
`;
const SidebarItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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
export default function Sidebar({
  documents,
  setCurrentDocument,
  setSidebarVisible,
  setDocuments,
  sidebarVisible,
  saveToLocalStorage,
}) {
  const handleCreate = () => {
    const newDocument = {
      createdAt: new Date().toLocaleDateString(),
      name: "untitled-document.md",
      content: "",
    };
    setDocuments([...documents, newDocument]);
    saveToLocalStorage([...documents, newDocument]);
    setCurrentDocument(newDocument);
  };

  const handleSelectDocument = (doc) => {
    setCurrentDocument(doc);
    setSidebarVisible(false);
  };

  return (
    <StyledSidebar visible={sidebarVisible}>
      <Button onClick={handleCreate}>New Document</Button>
      {documents.map((doc, index) => (
        <SidebarItem key={index} onClick={() => handleSelectDocument(doc)}>
          <span>{doc.createdAt}</span>
          <span>{doc.name}</span>
        </SidebarItem>
      ))}
    </StyledSidebar>
  );
}
