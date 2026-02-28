import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { projectAPI, taskAPI } from '../services/api';

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState({ todo: [], inprogress: [], completed: [] });
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getByProject(projectId);
      const groupedTasks = {
        todo: response.data.tasks.filter((t) => t.status === 'todo'),
        inprogress: response.data.tasks.filter((t) => t.status === 'inprogress'),
        completed: response.data.tasks.filter((t) => t.status === 'completed'),
      };
      setTasks(groupedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateStatus(taskId, newStatus);
      await fetchTasks();
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(taskId);
        await fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const TaskColumn = ({ status, title, taskList }) => (
    <Col md={4} className="mb-4">
      <div className="bg-light p-3 rounded">
        <h5 className="mb-3 fw-bold">{title}</h5>
        <div className="task-column" style={{ minHeight: '400px' }}>
          {taskList.map((task) => (
            <Card key={task._id} className="mb-2">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="mb-0">{task.title}</h6>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    ×
                  </Button>
                </div>
                <small className="text-muted d-block mb-2">{task.description}</small>
                <div className="mb-2">
                  <span
                    className={`badge bg-${
                      task.priority === 'high'
                        ? 'danger'
                        : task.priority === 'medium'
                        ? 'warning'
                        : 'success'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                {status !== 'completed' && (
                  <div>
                    {status === 'todo' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleStatusChange(task._id, 'inprogress')}
                        className="w-100"
                      >
                        Start
                      </Button>
                    )}
                    {status === 'inprogress' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleStatusChange(task._id, 'completed')}
                        className="w-100"
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Col>
  );

  if (loading) return <div className="text-center p-5">Loading tasks...</div>;

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <TaskColumn status="todo" title="📝 To Do" taskList={tasks.todo} />
        <TaskColumn
          status="inprogress"
          title="⏳ In Progress"
          taskList={tasks.inprogress}
        />
        <TaskColumn status="completed" title="✅ Completed" taskList={tasks.completed} />
      </Row>
    </Container>
  );
};

export default KanbanBoard;
