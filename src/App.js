
import './App.css';
import ToDoApp from './components/Todo';
import {createTheme, ThemeProvider } from '@mui/material'

const theme =createTheme({

})

function App() {
  return (
    <ThemeProvider theme={theme} >
    <div className="App">
    <ToDoApp />
    </div>
    </ThemeProvider>
  );
}

export default App;
