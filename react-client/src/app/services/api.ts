// createApi – основная функция RTK Query для создания API
// fetchBaseQuery – упрощенный fetch, встроенный в RTK Query
// retry – функция для автоматического повторного запроса при ошибке
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store" // типизация состояния Redux
import { BASE_URL } from "../../constants"

// Создание базового запроса
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => { // добавляет заголовок Authorization, если у пользователя есть token
    const token =
      (getState() as RootState).auth.token || localStorage.getItem("token") // Получает token из Redux или из localStorage

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

// Создание API
export const api = createApi({
  reducerPath: "splitApi", // задает имя ключа в Redux store
  baseQuery: baseQueryWithRetry, // использует наш запрос с обработкой заголовков и ретраями
  refetchOnMountOrArgChange: true, //  автоматически обновляет данные при изменении аргументов запроса или при монтировании компонента
  endpoints: () => ({}),
})
