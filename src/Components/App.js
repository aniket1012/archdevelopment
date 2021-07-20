import React from 'react'
import {
  ThemeProvider,
} from "@material-ui/core/styles";
import Header from './UI/Header';
import theme from './UI/Theme'




function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
     hello
    </ThemeProvider>
  );
}

export default App;
