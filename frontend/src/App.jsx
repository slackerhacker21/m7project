import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail'; 
import NavigationBar from './Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCharacter from './AddCharacter'; 
import EditCharacter from './EditCharacter'; 



// Home Page
function Home() {
  return <h1 className="text-center mt-5">Welcome to Marvel Character Manager</h1>;
}

// 404 Page
function NotFound() {
  return <h1 className="text-center mt-5 text-danger">404 - Page Not Found</h1>;
}

// Main App
function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/add" element={<AddCharacter />} />
          <Route path="/edit/:id" element={<EditCharacter />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
