import { Container, Typography } from '@mui/material';

export const About = () => {
  return (
    <Container>
      <Typography my={4} variant="h4">
        <a className="my-a" href="https://www.instagram.com/luis__0_1/" target="blank">
          Luis Henriquez
        </a>
      </Typography>

      <Typography mt={4} variant="h5">
        Esta es una pequeña web app de notas, recien termino la version 0.1, ¡hay mucho que mejorar!
        Puedes darme tus observaciones :D
      </Typography>

      <Typography my={4} variant="h6">
        ¡Gracias por usarla!
      </Typography>
    </Container>
  );
};
