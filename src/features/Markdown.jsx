import React from "react";
import styled from "styled-components";
import ContentBar from "../ui/ContentBar";

const EditorSection = styled.div`
  width: 50%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px); /* Adjust height based on navbar height */
`;

const Editor = styled.textarea`
  width: 100%;
  min-height: calc(99%-3rem);
  border: transparent;
  outline: none;
  resize: none;
  padding: 10px 20px;
  font-size: var(--font-size-medium);
  font-family: var(--roboto-mono);
  line-height: var(--line-height);
`;

export default function Markdown({ input, setInput, fullPreview }) {
  return fullPreview ? (
    ""
  ) : (
    <EditorSection>
      <ContentBar>
        <span>markdown</span>
      </ContentBar>
      <Editor value={input} onChange={(e) => setInput(e.target.value)} />
    </EditorSection>
  );
}
