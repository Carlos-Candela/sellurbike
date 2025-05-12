const authControllers = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/user-register', authControllers.user_register);
router.post('/admin-login', authControllers.admin_login)
router.get('/get-user',authMiddleware, authControllers.getUser)


module.exports = router;