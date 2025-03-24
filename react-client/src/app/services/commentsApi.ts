import { Comment } from "../types"
import { api } from "./api"

//Api для работы с комментариями
export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({ // // 1- ожидаемый ответ от сервера, 2 -  что мы отправляем
      query: (newComment) => ({
        url: `/comments`, // отправляем запрос на этот URL
        method: "POST",
        body: newComment, // // отправляем данные нового комментария в body
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
})

// Создаём кастомные хуки, которые можно вызывать в компонентах
export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsApi

// Экспортируем эндпоинты
export const {
  endpoints: { createComment, deleteComment },
} = commentsApi
