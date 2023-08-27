import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const CustomBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      size="small"
      color="secondary"
      variant="text"
      onClick={() => navigate(-1)}
      startIcon={<ChevronLeftIcon />}
      sx={{ color: '#494947' }}
    >
      Back
    </Button>
  );
};
