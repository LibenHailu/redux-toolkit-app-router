import { AddTodo } from "@/features/todos/AddTodo";
import { TodosList } from "@/features/todos/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 max-w-md mx-auto">
      <AddTodo />
      <TodosList />
    </main>
  );
}
