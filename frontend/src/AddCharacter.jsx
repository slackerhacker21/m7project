// frontend/src/AddCharacter.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function AddCharacter() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    alignment: '',
    powers: '',
    image_url: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE}/characters`, formData)
      .then(() => {
        setSuccess('Character added successfully!');
        setError('');
        setFormData({ name: '', alias: '', alignment: '', powers: '', image_url: '' });
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to add character');
        setSuccess('');
      });
  };

  return (
    <Container className="mt-5">
      <h2>Add New Character</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alias</Form.Label>
          <Form.Control name="alias" value={formData.alias} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alignment</Form.Label>
          <Form.Select name="alignment" value={formData.alignment} onChange={handleChange} required>
            <option value="">Choose...</option>
            <option value="hero">Hero</option>
            <option value="villain">Villain</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Powers</Form.Label>
          <Form.Control as="textarea" name="powers" value={formData.powers} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control name="image_url" value={formData.image_url} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" variant="primary">Add Character</Button>
      </Form>
    </Container>
  );
}

export default AddCharacter;
