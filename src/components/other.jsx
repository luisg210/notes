import { Container, Typography } from "@mui/material";


const Other = () => {    

  return ( 
    <Container>
            <Typography mt={4} variant="h4">
              By <a className="my-a" href="https://www.instagram.com/luis__0_1/" target="blank">Luis</a>
            </Typography>

            <Typography mt={4} variant="h5">
              Esta es una pequeña web app de notas, recien termino la version 0.1, ¡hay mucho que mejorar!
              Puedes darme tus observaciones :D
            </Typography>

            <Typography mt={4} variant="h6">
              ¡Gracias por usarla!
            </Typography>
    </Container>
  );
};

export default Other;
