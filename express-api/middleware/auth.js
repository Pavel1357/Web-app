const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    // расшифровываем токен
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            // проверка на валидность токена (тот ли он и актуален ли)
            return res.status(403).json({ error: 'Invalid token' })
        }
        // записыаем пользователя в req (в каждом запросе лежит целый пользователь, чтобы мы могли иметь к нему доступ)
        req.user = user;
        
        next();
    })
}

module.exports = authenticateToken;

