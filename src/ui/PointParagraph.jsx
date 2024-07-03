import styled from "styled-components";
const PointParagraph = styled.p`
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  &::before {
    content: "•"; /* Customize this to any character you want */
    position: absolute;
    left: 0;
    color: red; /* Customize the color */
    font-size: 20px; /* Customize the size */
    line-height: 1;
  }
`;

export default PointParagraph;
