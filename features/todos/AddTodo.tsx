"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useAddTodoMutation } from "../api/apiSlice"

export const AddTodo = () => {
    const [addTodo, { isLoading }] = useAddTodoMutation()

    const [task, setTask] = useState('')

    async function addTodoHandler() {
        if (task) {
            await addTodo({ title: task }).unwrap()
            setTask("")
        }
    }

    return (
        <>
            <div className="w-full flex-col gap-4">
                <Label htmlFor="task" className="mb-1">Task</Label>
                <Input placeholder="Task" id="task" value={task} onChange={e => setTask(e.target.value)} />
                <Button className="w-full justify-center my-2" type="button" aria-disabled={isLoading} onClick={addTodoHandler} size="sm">
                    Create Todo
                </Button>
            </div>
        </>
    )
}