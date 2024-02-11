"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectAllTodos, selectTodoStatus, todoDeleted } from './todosSlice'
// import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"
import { Todo } from '@/types/todo'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export const TodosList = () => {

    const todos = useSelector(selectAllTodos)
    const todoStatus = useSelector(selectTodoStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (todoStatus === 'idle') {
            dispatch(fetchTodos())
        }
    }, [todoStatus, dispatch])

    return (
        <section >
            <h2 className='font-bold py-2'>Todos</h2>
            <div className="grid gap-4">
                {
                    todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                }
            </div>
        </section>
    )
}

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    const dispatch = useDispatch()
    return (
        <div className="grid grid-cols-[auto,1fr,auto] min-w-[40ch] max-w-[40ch] space-x-3 items-center w-full">
            <Checkbox className="h-6 w-6 peer-children:hidden" id={todo.id} />
            <p className={cn("text-sm font-medium  truncate", todo.completed && "line-through")}>{todo.title}</p>
            <Button className="h-8 flex items-center" variant="destructive" onClick={() => dispatch(todoDeleted(todo.id))}>
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
            </Button>
        </div>
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
