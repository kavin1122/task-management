import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { projectAPI, taskAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, tasks: 0, completed: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes] = await Promise.all([
        projectAPI.getAll(),
        taskAPI.getAll(),
      ]);

      const projects = projectsRes.data.projects || [];
      const tasks = tasksRes.data.tasks || [];
      const completed = tasks.filter((t) => t.status === 'completed').length;

      setStats({
        projects: projects.length,
        tasks: tasks.length,
        completed,
      });

      setRecentTasks(tasks.slice(0, 5));
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-5">Loading dashboard...</div>;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Welcome, {user?.name}! 👋</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h5 className="text-muted">Total Projects</h5>
              <h2 className="text-primary">{stats.projects}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h5 className="text-muted">Total Tasks</h5>
              <h2 className="text-warning">{stats.tasks}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h5 className="text-muted">Completed Tasks</h5>
              <h2 className="text-success">{stats.completed}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mb-4">Recent Tasks</h3>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.projectId?.title}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        task.status === 'todo'
                          ? 'secondary'
                          : task.status === 'inprogress'
                          ? 'warning'
                          : 'success'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No tasks yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Link to="/projects" className="btn btn-primary">
          View All Projects →
        </Link>
      </div>
    </Container>
  );
};

export default Dashboard;
