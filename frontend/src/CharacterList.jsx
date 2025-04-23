import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 👈 Import added

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/characters`)
      .then((res) => {
        setCharacters(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch characters.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="mt-5 mx-auto d-block" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  return (
    <Row className="mt-4">
      {characters.map((character) => (
        <Col key={character.id} md={6} lg={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={character.image_url} />
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Alias: {character.alias}</Card.Subtitle>
              <Card.Text>
                <strong>Alignment:</strong> {character.alignment}<br />
                <strong>Powers:</strong> {character.powers}
              </Card.Text>
              <Link to={`/characters/${character.id}`}>
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CharacterList;

