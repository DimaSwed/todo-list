import { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/widgets/todo-list/api/todoApi'

export const TodoInput = () => {
  const [text, setText] = useState('')

  const queryClient = useQueryClient()

  const { mutate: addTodo } = useMutation({
    mutationFn: todoApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setText('')
    }
  })

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
      addTodo({ id: crypto.randomUUID(), completed: false, createdAt, text })
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
