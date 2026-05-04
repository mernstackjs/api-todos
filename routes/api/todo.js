const { Router } = require('express');
const Todo = require('../../model/todo');
const { protect } = require('../../middleware/auth');

const router = Router();

router.post('/new', protect, async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res.status(400).json({
        message: 'must fill all fields',
      });
    }

    const newTodo = new Todo({
      title,
      desc,
      ownerId: req.user.id,
    });
    const saveTodo = await newTodo.save();
    res.status(201).json(saveTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/', protect, async (req, res) => {
  try {
    const query = { ownerId: req.user.id };
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
    }
    const todos = await Todo.find(query);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
