import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`{
:root{
&,&.light-ode{
--color-dark-0: #151619;
  --color-dark-100: #1d1f22;
  --color-dark-200: #2b2d31;
  --color-dark-300: #35393f;
  --color-grey-0: #5a6069;
  --color-grey-100: #7c8187;
  --color-grey-200: #c1c4cb;
  --color-grey-300: #e4e4e4;
  --color-white-0: #ffffff;
  --color-white-100: #f5f5f5;
  --color-orange-0: #e46643;
  --color-orange-100: #f39765;

}
&.dark-mode{
--color-white-100: #1d1f22;
  --color-white-0: #151619;
  --color-dark-300: #c1c4cb;
}
}
}`;

export default GlobalStyles;
