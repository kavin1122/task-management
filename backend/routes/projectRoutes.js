const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  addMemberToProject,
  deleteProject,
} = require('../controllers/projectController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.post('/:id/members', addMemberToProject);
router.delete('/:id', deleteProject);

module.exports = router;
