// src/CharacterDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Alert } from 'react-bootstrap';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/characters/${id}`)
      .then(res => {
        setCharacter(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch character');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!character) return null;

  return (
    <Card className="mt-4">
      <Card.Img variant="top" src={character.image_url} alt={character.name} />
      <Card.Body>
        <Card.Title>{character.name} ({character.alias})</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{character.alignment}</Card.Subtitle>
        <Card.Text>{character.powers}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CharacterDetail;
