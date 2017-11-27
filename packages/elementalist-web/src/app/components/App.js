import React from 'react'
import styled, { injectGlobal } from 'styled-components'

const App = () => (
  <Container>
    <h1>This is a header</h1>
  </Container>
)

injectGlobal`

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
}
`

const Container = styled.div``

export default App
