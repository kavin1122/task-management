const Task = require('../models/Task');
const Project = require('../models/Project');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, priority, deadline } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and projectId are required' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = new Task({
      title,
      description,
      projectId,
      assignedTo,
      priority: priority || 'medium',
      deadline,
    });

    await task.save();
    await task.populate(['projectId', 'assignedTo']);

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(['projectId', 'assignedTo']);
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Get tasks by project ID
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId }).populate(['projectId', 'assignedTo']);
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(['projectId', 'assignedTo']);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, priority, deadline } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) task.assignedTo = assignedTo;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (deadline) task.deadline = deadline;

    await task.save();
    await task.populate(['projectId', 'assignedTo']);

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Update task status (for Kanban board)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['todo', 'inprogress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate(['projectId', 'assignedTo']);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
