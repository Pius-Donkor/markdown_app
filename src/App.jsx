import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./ui/Navbar";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Sidebar = styled.div`
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

const SidebarItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: ${({ shifted }) => (shifted ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  overflow: hidden;
`;

const EditorSection = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 60px); /* Adjust height based on navbar height */
`;

const PreviewSection = styled(EditorSection)`
  border-left: 1px solid #ddd;
`;

const DocumentName = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Editor = styled.textarea`
  width: 100%;
  height: calc(100% - 60px);
`;

const Preview = styled.div`
  padding: 10px;
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

  const parseMarkdown = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let currentParagraph = "";
    let inSeaBlueDiv = false;

    lines.forEach((line, index) => {
      if (line.startsWith("######")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<h6 key={index}>{line.slice(6)}</h6>);
      } else if (line.startsWith("#####")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<h5 key={index}>{line.slice(5)}</h5>);
      } else if (line.startsWith("####")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<h4 key={index}>{line.slice(4)}</h4>);
      } else if (line.startsWith("###")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<h3 key={index}>{line.slice(3)}</h3>);
      } else if (line.startsWith("##")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<h2 key={index}>{line.slice(2)}</h2>);
      } else if (line.startsWith("#")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<h1 key={index}>{line.slice(1)}</h1>);
      } else if (/^\d+\. /.test(line)) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(<p key={index}>{line}</p>);
      } else if (line.startsWith("- ")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(
          <p key={index} style={{ listStyleType: "circle", color: "red" }}>
            {line.slice(2)}
          </p>
        );
      } else if (line.startsWith("> ")) {
        if (currentParagraph) {
          elements.push(<p key={elements.length}>{currentParagraph}</p>);
          currentParagraph = "";
        }
        elements.push(
          <div
            key={index}
            style={{ backgroundColor: "blue", padding: "10px", color: "white" }}
          >
            {line.slice(2)}
          </div>
        );
      } else if (line.startsWith("---")) {
        if (inSeaBlueDiv) {
          elements.push(
            <div
              key={index}
              style={{
                backgroundColor: "lightseagreen",
                padding: "10px",
                color: "white",
              }}
            >
              {currentParagraph}
            </div>
          );
          currentParagraph = "";
          inSeaBlueDiv = false;
        } else {
          inSeaBlueDiv = true;
        }
      } else {
        if (inSeaBlueDiv) {
          if (currentParagraph) {
            currentParagraph += ` ${line}`;
          } else {
            currentParagraph = line;
          }
        } else {
          if (currentParagraph) {
            currentParagraph += ` ${line}`;
          } else {
            currentParagraph = line;
          }
        }
      }
    });

    if (currentParagraph) {
      if (inSeaBlueDiv) {
        elements.push(
          <div
            key={elements.length}
            style={{
              backgroundColor: "lightseagreen",
              padding: "10px",
              color: "white",
            }}
          >
            {currentParagraph}
          </div>
        );
      } else {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
      }
    }

    return elements;
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
      <Sidebar visible={sidebarVisible}>
        <Button onClick={handleCreate}>New Document</Button>
        {documents.map((doc, index) => (
          <SidebarItem key={index} onClick={() => handleSelectDocument(doc)}>
            <span>{doc.createdAt}</span>
            <span>{doc.name}</span>
          </SidebarItem>
        ))}
      </Sidebar>
      <MainContent shifted={sidebarVisible}>
        {currentDocument && (
          <EditorSection>
            <DocumentName
              type="text"
              value={currentDocument.name}
              onChange={handleNameChange}
            />
            <Editor value={input} onChange={(e) => setInput(e.target.value)} />
          </EditorSection>
        )}
        <PreviewSection>{parseMarkdown(input)}</PreviewSection>
      </MainContent>
    </AppContainer>
  );
};

export default App;
