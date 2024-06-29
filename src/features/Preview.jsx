import React from "react";
import styled from "styled-components";
import { parseMarkdown } from "../utils/helper";

const EditorSection = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 60px); /* Adjust height based on navbar height */
`;

const PreviewSection = styled(EditorSection)`
  border-left: 1px solid #ddd;
`;
export default function Preview({ input }) {
  return <PreviewSection>{parseMarkdown(input)}</PreviewSection>;
}
