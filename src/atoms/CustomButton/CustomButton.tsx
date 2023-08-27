import { Button } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
interface CustomButtonProps {
  content: string;
  navigateTo: To;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  navigateTo,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      size="small"
      color="secondary"
      variant="text"
      onClick={() => navigate(navigateTo)}
      startIcon={<ChevronLeftIcon />}
      sx={{ color: '#494947', margin: '0 15px 5px 0' }}
    >
      {content}
    </Button>
  );
};
