import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Alert, Button, Container } from 'react-bootstrap';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/characters/${id}`)
      .then(res => {
        setCharacter(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch character.");
        setLoading(false);
      });
  }, [id]);

  // DELETE handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE}/characters/${id}`);
        navigate('/characters'); // Redirect after delete
      } catch (err) {
        setDeleteError('Failed to delete character.');
      }
    }
  };

  if (loading) return <Spinner animation="border" className="mt-5 mx-auto d-block" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  if (!character) return null;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={character.image_url} alt={character.name} />
        <Card.Body>
          <Card.Title>{character.name} ({character.alias})</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{character.alignment}</Card.Subtitle>
          <Card.Text>
            <strong>Powers:</strong> {character.powers}
          </Card.Text>
          <Link to="/characters">
            <Button variant="secondary">← Back to List</Button>
          </Link>
          <Link to={`/edit/${character.id}`}>
            <Button variant="warning" className="ms-2">Edit</Button>
          </Link>
          <Button
            variant="danger"
            className="ms-2"
            onClick={handleDelete}
          >
            Delete
          </Button>
          {deleteError && <Alert variant="danger" className="mt-3">{deleteError}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CharacterDetail;
