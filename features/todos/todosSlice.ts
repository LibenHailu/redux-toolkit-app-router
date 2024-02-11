import { AppStore, RootState } from '@/store/store';
import { Todo } from '@/types/todo';
import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    todos: [] as Todo[],
    error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json()
})

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: {
            reducer(state, action: PayloadAction<Todo>) {
                state.todos.push(action.payload);
            },
            prepare(task: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title: task,
                        completed: false
                    }
                }
            },
        },
        todoUpdated: (state, action) => {
            const { id, completed } = action.payload
            const existingTodo = state.todos.find(todo => todo.id === id)
            if (existingTodo) {
                existingTodo.completed = completed
            }
        },
        todoDeleted: (state, action) => {
            const { id } = action.payload
            state.todos = state.todos.filter(todo => todo.id !== id);
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = state.todos.concat(action.payload);
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
            });
    }

})

export const { todoAdded, todoUpdated, todoDeleted } = todosSlice.actions
export const selectAllTodos = (state: RootState) => state.todos.todos;
export const selectTodoStatus = (state: RootState) => state.todos.status;

export default todosSlice.reducer