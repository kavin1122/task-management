import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { projectAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data.projects);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectAPI.create(formData);
      setSuccess('Project created successfully!');
      setFormData({ title: '', description: '' });
      setShowModal(false);
      await fetchProjects();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(projectId);
        setSuccess('Project deleted successfully!');
        await fetchProjects();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="text-center p-5">Loading projects...</div>;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Projects</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + New Project
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows={3}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-grow-1">
                Create Project
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="flex-grow-1"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Col md={6} lg={4} key={project._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text className="text-muted">{project.description}</Card.Text>
                  <div className="mb-3">
                    <small className="text-muted">
                      {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                    </small>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-light">
                  <Link
                    to={`/project/${project._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project._id)}
                    className="float-end"
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p className="text-muted">No projects yet. Create one to get started!</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Projects;
