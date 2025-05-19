const authControllers = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();


router.post('/user-login', authControllers.user_login);
router.post('/user-register', authControllers.user_register);
router.post('/admin-login', authControllers.admin_login)
router.get('/get-user',authMiddleware, authControllers.getUser)
router.post('/profile-image-upload',authMiddleware, authControllers.profile_image_upload)
router.post('/profile-data-change',authMiddleware, authControllers.profile_data_change)



module.exports = router;