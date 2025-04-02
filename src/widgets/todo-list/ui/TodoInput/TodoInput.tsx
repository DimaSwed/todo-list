import { Box, TextField } from '@mui/material'

export const TodoInput = () => {
  return (
    <Box component="form" sx={{ mb: 2 }}>
      <TextField fullWidth variant="outlined" placeholder="What needs to be done?" />
    </Box>
  )
}
