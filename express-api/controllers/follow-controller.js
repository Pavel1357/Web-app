const { prisma } = require("../prisma/prisma-client");

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body; // id того, на кого мы хотим подписаться
    const userId = req.user.userId;

    if (followingId === userId) {
      return res.status(500).json({ message: 'Вы не можете подписаться на самого себя' });
    }

    try {
      const existingSubscription = await prisma.follows.findFirst({
        where: {
           AND: [
             {
               followerId: userId
             },
             {
               followingId
             }
           ]
        }
       })
       // на фронте мы сделаем так, чтобы это условие было невозможно вызвать
      if (existingSubscription) {
        return res.status(400).json({ message: 'Подписка уже существует' });
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });

      res.status(201).json({ message: 'Подписка успешно создана' });
    } catch (error) {
      console.error('Follow error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },
  unfollowUser: async (req, res) => {
    const { followingId } = req.body; // на кого мы сейчас подписаны (чтобы отписаться)
    const userId = req.user.userId;

    try {
      const follows = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId: followingId }]
        },
      });
      // если и так не был подписан
      if (!follows) {
        return res.status(404).json({ error: "Вы не подписаны на этого пользователя" });
      }

      await prisma.follows.delete({
        where: { id: follows.id },
      });

      res.status(200).json({ message: 'Отписка успешно выполнена' });
    } catch (error) {
      console.error('Unfollow error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
};

module.exports = FollowController;