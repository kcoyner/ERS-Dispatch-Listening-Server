/**
 * src/components/Calls/CallList-css.jsx
 */

import styled from "styled-components";

module.exports = {

Title: styled.h1`
  font-size: 2.0em;
  text-align: center;
  color: DarkSlateGray;
`,

Subtitle: styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  color: DarkSlateGray;
  font-size: 1.4em;
  margin: 0 10% 0 10%;
`,

Entry: styled.div`
  font-size: 1.2em;
  text-align: left;
  color: DimGray;
`,

Wrapper: styled.section`
  padding: 4em;
  background: PapayaWhip;
`,

CallTable: styled.div`
  display: grid;
  margin: 0 10% 0 10%;
  grid-template-columns: 1fr;
`


}
