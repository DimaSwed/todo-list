import { TodoFilter } from '@/entities/todo/types'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useClearCompleted } from '@/widgets/todo-list/hooks/useTodos'

interface ITodoTabsProps {
  filter: TodoFilter
  setFilter: (filter: TodoFilter) => void
  activeCount: number
}

export const TodoTabs = ({ filter, setFilter, activeCount }: ITodoTabsProps) => {
  const { mutate: clearCompleted } = useClearCompleted()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      <Typography variant="body2" color="divider">
        {activeCount} items left
      </Typography>

      <Box>
        <Tabs
          value={filter}
          onChange={(_, newValue) => setFilter(newValue)}
          centered
          slotProps={{
            indicator: {
              sx: {
                display: 'none'
              }
            }
          }}
          sx={{ '& .MuiTabs-flexContainer': { gap: 0, flexWrap: 'wrap' } }}
        >
          <Tab label="All" value="all" />
          <Tab label="Active" value="active" />
          <Tab label="Completed" value="completed" />
        </Tabs>
      </Box>

      <Typography
        variant="body2"
        color="divider"
        onClick={() => clearCompleted()}
        sx={{
          cursor: 'pointer',
          fontWeight: 600,
          '&:hover': { color: 'secondary.main' }
        }}
      >
        Clear completed
      </Typography>
    </Box>
  )
}
