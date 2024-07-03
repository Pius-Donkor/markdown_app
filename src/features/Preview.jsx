import React from "react";
import styled, { css } from "styled-components";
import { parseMarkdown } from "../utils/helper";
import ContentBar from "../ui/ContentBar";
import Icon from "../ui/Icon";

const fullScreenStyles = css`
  width: 100%;
  display: flex;
`;

const EditorSection = styled.div`
  width: 50%;
  overflow-y: auto;
  height: calc(100vh - 60px); /* Adjust height based on navbar height */
`;

const PreviewSection = styled(EditorSection)`
  border-left: 1px solid var(--color-grey-300);
  ${({ isFullScreen }) => (isFullScreen ? fullScreenStyles : "")}
  align-items: center;
  flex-direction: column;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ isFullScreen }) => (isFullScreen ? "50%" : "100%")};
  height: calc(100%-3rem);
`;

const StyledPreview = styled.div`
  width: 100%;
  height: calc(100%-3rem);
  padding: 20px;
  overflow-y: auto;
`;

export default function Preview({ input, fullPreview, setFullPreview }) {
  return (
    <PreviewSection isFullScreen={fullPreview}>
      <ContentBar>
        <span>preview</span>
        {fullPreview ? (
          <Icon
            onClick={() => setFullPreview((prev) => !prev)}
            src="/assets/icon-hide-preview.svg"
          />
        ) : (
          <Icon
            onClick={() => setFullPreview((prev) => !prev)}
            src="/assets/icon-show-preview.svg"
          />
        )}
      </ContentBar>
      <PreviewWrapper isFullScreen={fullPreview}>
        <StyledPreview>{parseMarkdown(input)}</StyledPreview>
      </PreviewWrapper>
    </PreviewSection>
  );
}
