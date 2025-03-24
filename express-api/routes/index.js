const express = require('express');
const router = express.Router();
const multer = require('multer');
//const UserController = require('../controllers/user-controller');
const { UserController, PostController, CommentController, LikeController, FollowController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const uploadDestination = 'uploads';

// Показываем, где хранить файлы
const storage = multer.diskStorage({ // обращаемся к диску, который хранит наши данные
    destination: uploadDestination,
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
// переменная, в которой создается хранилище
const uploads = multer({ storage: storage });

// Роуты пользователя
router.post('/register', UserController.regiser)
router.post('/login', UserController.login)
router.get('/current', authenticateToken, UserController.current)
router.get('/users/:id', authenticateToken, UserController.getUserById)
router.put('/users/:id', authenticateToken, uploads.single('avatar'), UserController.updateUser)

// Роуты постов
router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPosts)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)

// Роуты комментариев
router.post('/comments', authenticateToken, CommentController.createComment)
router.delete('/comments/:id', authenticateToken, CommentController.deleteComment)

// Роуты лайков
router.post('/likes', authenticateToken, LikeController.likePost)
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost)

//Роуты подписок
router.post('/follow', authenticateToken, FollowController.followUser)
router.delete('/unfollow/:id', authenticateToken, FollowController.unfollowUser)

module.exports = router;

