import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function EditCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    alignment: '',
    powers: '',
    image_url: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/characters/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch character.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_BASE}/characters/${id}`, formData)
      .then(() => {
        setSuccess('Character updated successfully!');
        navigate('/characters');
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to update character.');
      });
  };

  if (loading) return <Spinner animation="border" className="mt-5 mx-auto d-block" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h2>Edit Character</h2>
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

        <Button type="submit" variant="primary">Update Character</Button>
      </Form>
    </Container>
  );
}

export default EditCharacter;
