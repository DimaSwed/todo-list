import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

export const TodoItem = () => {
  return (
    <ListItem disablePadding divider>
      <ListItemButton
        dense
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '45px'
        }}
      >
        <ListItemIcon
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Checkbox
            edge="start"
            tabIndex={-1}
            // disableRipple
            sx={{
              color: 'secondary.main',
              '&.Mui-checked': {
                color: 'secondary.main'
              }
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary="Todo item text"
          primaryTypographyProps={{
            sx: {
              fontSize: '18px',
              color: 'divider'
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
