
import { Todo } from '@/types/todo'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    tagTypes: ['Todo'],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => ({ url: '/todos' }),
            providesTags: (result = [], error, arg) => [
                'Todo',
                ...result.map(({ id }: Todo) => ({ type: 'Todo', id }))
            ] // Provides Todo tag and {type: 'Todo', id} tag for each todo
        }),
        addTodo: builder.mutation({
            query: (todo: Todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ['Todo'] // invalidates the general 'Todo' tag
        }),
        getTodo: builder.query({
            query: (id: string) => ({ url: `/todos/${id}` }),
            providesTags: (result, error, arg) => [{ type: 'Todo', id: arg }] // provides {type: 'Todo', id} for a specific todo
        }),
        updateTodo: builder.mutation({
            query: (todo: Todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }] //  invalidates the specific {type: 'Todo', id} tag.
        }),
        deleteTodo: builder.mutation({
            query: (id: string) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Todo'] // invalidates the general 'Todo' tag
        })
    })
})

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = apiSlice