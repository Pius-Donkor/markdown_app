import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./ui/Navbar";
import Sidebar from "./ui/Sidebar";
import Markdown from "./features/Markdown";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: ${({ shifted }) => (shifted ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  overflow: hidden;
`;

const App = () => {
  const [input, setInput] = useState("");
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const savedDocuments =
      JSON.parse(localStorage.getItem("markdown-documents")) || [];
    setDocuments(savedDocuments);
  }, []);

  useEffect(() => {
    if (currentDocument !== null) {
      setInput(currentDocument.content);
    } else {
      setInput("");
    }
  }, [currentDocument]);

  const saveToLocalStorage = (docs) => {
    localStorage.setItem("markdown-documents", JSON.stringify(docs));
  };

  const handleNameChange = (event) => {
    if (currentDocument) {
      const updatedDocument = { ...currentDocument, name: event.target.value };
      const updatedDocuments = documents.map((doc) =>
        doc === currentDocument ? updatedDocument : doc
      );
      setDocuments(updatedDocuments);
      setCurrentDocument(updatedDocument);
      saveToLocalStorage(updatedDocuments);
    }
  };

  return (
    <AppContainer>
      <Navbar
        currentDocument={currentDocument}
        documents={documents}
        input={input}
        saveToLocalStorage={saveToLocalStorage}
        setCurrentDocument={setCurrentDocument}
        setDocuments={setDocuments}
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar
        documents={documents}
        saveToLocalStorage={saveToLocalStorage}
        setCurrentDocument={setCurrentDocument}
        setDocuments={setDocuments}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <MainContent shifted={sidebarVisible}>
        {currentDocument && (
          <Markdown
            currentDocument={currentDocument}
            handleNameChange={handleNameChange}
            input={input}
            setInput={setInput}
          />
        )}
      </MainContent>
    </AppContainer>
  );
};

export default App;
