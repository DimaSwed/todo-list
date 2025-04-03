import { useState } from 'react'
import { Box, TextField, IconButton, InputAdornment, Button } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: text && (
            <InputAdornment position="end">
              <IconButton onClick={() => setText('')} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ flexShrink: 0, flexGrow: 0, boxShadow: 0, border: 'none' }}
      >
        Add
      </Button>
    </Box>
  )
}
