const express = require('express')

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../Controllers/Movies.js');

const auth = require ( '../middleware/auth.js');

const router = express.Router()

router.get('/', getMovies)
router.post('/', auth, createMovie)
router.patch('/:id', auth, updateMovie)
router.delete('/:id', auth, deleteMovie)

export default router