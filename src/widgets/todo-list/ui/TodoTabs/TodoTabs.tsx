import { Box, Tab, Tabs, Typography } from '@mui/material'

export const TodoTabs = () => {
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
        1 items left
      </Typography>

      <Box>
        <Tabs
          value="all"
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
