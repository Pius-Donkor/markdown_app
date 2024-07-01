import styled from "styled-components";

const Icon = styled.img`
  width: ${({ type }) => (type === "small" ? "15px" : "20px")};
  height: ${({ type }) => (type === "small" ? "15px" : "20px")};
  cursor: pointer;
`;

export default Icon;
