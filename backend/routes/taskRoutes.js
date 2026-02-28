const express = require('express');
const {
  createTask,
  getAllTasks,
  getTasksByProject,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/project/:projectId', getTasksByProject);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;
