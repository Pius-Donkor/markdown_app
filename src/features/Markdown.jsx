import React from "react";
import styled from "styled-components";
const DocumentName = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const EditorSection = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 60px); /* Adjust height based on navbar height */
`;
const Editor = styled.textarea`
  width: 100%;
  height: calc(100% - 60px);
`;

export default function Markdown({
  currentDocument,
  handleNameChange,
  input,
  setInput,
}) {
  return (
    <EditorSection>
      <DocumentName
        type="text"
        value={currentDocument.name}
        onChange={handleNameChange}
      />
      <Editor value={input} onChange={(e) => setInput(e.target.value)} />
    </EditorSection>
  );
}
