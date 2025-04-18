import { Box, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        px: 2
      }}
    >
      <Stack spacing={3} alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'red' }} />
        <Typography variant="h3" fontWeight="bold">
          404 - 페이지를 찾을 수 없습니다
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.7 }}>
          주소가 잘못됐거나, 삭제된 페이지입니다.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#e50914', '&:hover': { backgroundColor: '#b20710' } }}
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </Button>
      </Stack>
    </Box>
  )
}
