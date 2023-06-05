const { User, Thought } = require('../models');

const thoughtController = {
  // GET /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET /api/thoughts/:thoughtId
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST /api/thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // PUT /api/thoughts/:thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // DELETE /api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        // Remove thought reference from associated user
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this thought!' });
        }
        res.json({ message: 'Thought and associated user data deleted successfully!' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST /api/thoughts/:thoughtId/reactions
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = thoughtController;
