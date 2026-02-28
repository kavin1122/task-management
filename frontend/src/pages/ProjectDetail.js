import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { projectAPI, taskAPI, authAPI } from '../services/api';
import KanbanBoard from '../components/KanbanBoard';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    assignedTo: '',
  });
  const [selectedMember, setSelectedMember] = useState('');

  useEffect(() => {
    fetchProjectAndUsers();
  }, [id]);

  const fetchProjectAndUsers = async () => {
    try {
      setLoading(true);
      const [projectRes, usersRes] = await Promise.all([
        projectAPI.getById(id),
        authAPI.getUsers(),
      ]);
      setProject(projectRes.data.project);
      setUsers(usersRes.data.users);
      setError(null);
    } catch (err) {
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.create({
        ...taskFormData,
        projectId: id,
      });
      setSuccess('Task created successfully!');
      setTaskFormData({
        title: '',
        description: '',
        priority: 'medium',
        deadline: '',
        assignedTo: '',
      });
      setShowTaskModal(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      setError('Please select a member');
      return;
    }
    try {
      await projectAPI.addMember(id, { memberId: selectedMember });
      setSuccess('Member added successfully!');
      setSelectedMember('');
      setShowMemberModal(false);
      await fetchProjectAndUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add member');
    }
  };

  if (loading) return <div className="text-center p-5">Loading project...</div>;

  if (!project) return <div className="text-center p-5">Project not found</div>;

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Button variant="outline-secondary" onClick={() => navigate('/projects')}>
          ← Back to Projects
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h1>{project.title}</h1>
          <p className="text-muted">{project.description}</p>
          <Row className="mt-4">
            <Col md={6}>
              <div className="mb-3">
                <h6>Project Members</h6>
                <div>
                  {project.members.map((member) => (
                    <span key={member._id} className="badge bg-secondary me-2 mb-2">
                      {member.name}
                    </span>
                  ))}
                </div>
              </div>
            </Col>
            <Col md={6} className="text-end">
              <Button variant="primary" size="sm" onClick={() => setShowTaskModal(true)}>
                + Add Task
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="ms-2"
                onClick={() => setShowMemberModal(true)}
              >
                + Add Member
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Kanban Board */}
      <h3 className="mb-4">Task Board</h3>
      <KanbanBoard projectId={id} />

      {/* Add Task Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTask}>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={taskFormData.title}
                onChange={handleTaskChange}
                placeholder="Enter task title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={taskFormData.description}
                onChange={handleTaskChange}
                placeholder="Enter task description"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={taskFormData.priority}
                onChange={handleTaskChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Select
                name="assignedTo"
                value={taskFormData.assignedTo}
                onChange={handleTaskChange}
              >
                <option value="">Select a team member</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={taskFormData.deadline}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-grow-1">
                Create Task
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowTaskModal(false)}
                className="flex-grow-1"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Member Modal */}
      <Modal show={showMemberModal} onHide={() => setShowMemberModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMember}>
            <Form.Group className="mb-3">
              <Form.Label>Select Member</Form.Label>
              <Form.Select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                <option value="">Choose a member...</option>
                {users
                  .filter(
                    (user) =>
                      !project.members.some((member) => member._id === user._id)
                  )
                  .map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-grow-1">
                Add Member
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowMemberModal(false)}
                className="flex-grow-1"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectDetail;
