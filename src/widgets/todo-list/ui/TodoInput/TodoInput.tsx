import { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { useAddTodo } from '@/widgets/todo-list/hooks/useTodos'

export const TodoInput = () => {
  const [text, setText] = useState('')

  const { mutate: addTodo } = useAddTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      const createdAt = new Date().toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      addTodo({ id: crypto.randomUUID(), completed: false, createdAt, text }), setText('')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  )
}
