const Project = require('../models/Project');
const User = require('../models/User');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const project = new Project({
      title,
      description,
      createdBy: req.user.id,
      members: members || [req.user.id],
    });

    await project.save();
    await project.populate(['createdBy', 'members']);

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(['createdBy', 'members']);
    res.status(200).json({
      message: 'Projects retrieved successfully',
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(['createdBy', 'members']);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({
      message: 'Project retrieved successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is creator or admin
    if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (members) project.members = members;

    await project.save();
    await project.populate(['createdBy', 'members']);

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Add member to project
exports.addMemberToProject = async (req, res) => {
  try {
    const { memberId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.members.includes(memberId)) {
      return res.status(400).json({ message: 'Member already in project' });
    }

    project.members.push(memberId);
    await project.save();
    await project.populate(['createdBy', 'members']);

    res.status(200).json({
      message: 'Member added to project',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error: error.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
