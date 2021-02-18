import ChartWrapper from './ChartWrapper';
import { Navbar, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand href="#home">Barchartly</Navbar.Brand>
      </Navbar>
      <Container>
        <ChartWrapper />
      </Container>
      
    </div>
  );
}

export default App;
