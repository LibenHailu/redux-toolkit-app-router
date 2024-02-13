"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../api/apiSlice'

export const TodosList = () => {

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <section >
            <h2 className='font-bold py-2'>Todos</h2>
            <div className="grid gap-4">
                {
                    todos.map((todo: TodoItemProp) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                }
            </div>
        </section>
    )
}

type TodoItemProp = { id: string, title: string, completed: boolean }
export const TodoItem: React.FC<{ todo: TodoItemProp }> = ({ todo }) => {
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [checked, setChecked] = useState(todo.completed)

    return (
        <div className="min-w-[40ch] max-w-[40ch] items-center justify-center">
            <div className="flex items-center space-x-2">
                <Checkbox id={todo.id}
                    checked={checked} onCheckedChange={(e) => {
                        setChecked(!checked)
                        updateTodo({ ...todo, completed: !checked })
                    }}
                />
                <label htmlFor={todo.id} className={cn("text-sm font-medium", todo.completed ? "line-through" : "")}>{todo.title}</label>
            </div>
            <Button className="w-full" size="sm" variant="destructive" onClick={() => deleteTodo(todo.id)}>
                Delete Todo
            </Button>
        </div >
    )
}

function TrashIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}
