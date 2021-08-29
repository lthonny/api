const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

// router.post('/api/auth/sign_up', validateAuth, auth.signUp);
// router.post('/api/auth/sign_in', auth.signIn);

// router.post('/api/tasks', authorize, model.create);
// router.get('/api/tasks', authorize, model.fetchAll);
// router.get('/api/tasks/:id', authorize, model.fetchOne);
// router.put('/api/tasks/:id', authorize, model.update);
// router.delete('/api/tasks/:id', authorize, model.delete);


const userController = require('../controllers/userController');

router.post('/sign_up',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  userController.sign_up);
router.post('/sign_in', userController.sign_in);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
// router.get('/tasks', userController.getUsers);


module.exports = router;
