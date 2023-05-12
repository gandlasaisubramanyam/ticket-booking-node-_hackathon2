const mongoose = require('mongoose');
const Movie = require('../Models/Movie.js');

export const getMovies = async (req, res) => {
  try {
    const Movies = await Movie.find()

    return res.status(200).json(Movies)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
  return res.send('This is movies')
}

export const createMovie = async (req, res) => {
  const movie = req.body

  if (!req.userId) return res.json({ message: 'Unauthenticated' })

  const newMovie = new Movie(movie)
  try {
    await newMovie.save()

    return res.status(201).json(newMovie)
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

export const updateMovie = async (req, res) => {
  const { id: _id } = req.params
  const movie = req.body

  if (!req.userId) return res.json({ message: 'Unauthenticated' })

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No movie with that id.')

  const updatedMovie = await Movie.findByIdAndUpdate(_id, movie, { new: true })

  return res.json(updatedMovie)
}

export const deleteMovie = async (req, res) => {
  const { id: _id } = req.params

  if (!req.userId) return res.json({ message: 'Unauthenticated' })

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No movie with that id.')

  await Movie.findByIdAndRemove(_id)

  return res.json({ message: 'Post deleted successfully' })
}