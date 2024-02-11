"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { todoAdded } from "./todosSlice"

export const AddTodo = () => {
    const dispatch = useDispatch()

    const [task, setTask] = useState('')

    function addTodo() {
        if (task) {
            dispatch(todoAdded(task))
            setTask("")
        }
    }

    return (
        <>
            <div className="w-full flex-col gap-4">
                <Label htmlFor="task" className="mb-1">Task</Label>
                <Input placeholder="Task" id="task" value={task} onChange={e => setTask(e.target.value)} />
                <Button className="w-full justify-center my-2" type="button" onClick={addTodo} size="sm">
                    Create Todo
                </Button>
            </div>
        </>
    )
}