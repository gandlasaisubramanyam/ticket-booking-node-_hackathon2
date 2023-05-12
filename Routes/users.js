const express = requir ('express');

const { signin, signup }=require ('../Controllers/user.js');

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

export default router