import { Typography } from '@mui/material';

type Props = {
  title: string | undefined;
};

export const MainTitle = ({ title }: Props) => {
  return (
    <Typography variant="h4" align="center" marginTop="1rem" gutterBottom>
      {title || 'Notas lulu'}
    </Typography>
  );
};
