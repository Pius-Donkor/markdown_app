import React from "react";
import styled from "styled-components";
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

export default function Markdown({ input, setInput }) {
  return (
    <EditorSection>
      <Editor value={input} onChange={(e) => setInput(e.target.value)} />
    </EditorSection>
  );
}
