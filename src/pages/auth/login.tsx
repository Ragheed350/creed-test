// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Stack, Alert, Container, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

const boxShadow = "rgb(145 158 171 / 0%) 0px 0px 2px 0px, rgb(145 158 171 / 22%) 0px 12px 24px -4px";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export const Login: React.FC = () => {
  return (
    <RootStyle>
      <Card sx={{ height: "100%", ml: 6, boxShadow, borderRadius: 4 }}>
        <Typography variant="h3" sx={{ textAlign: "center", pt: 4 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/assets/illustration-login.jpg" alt="login" width="100%" height={500} style={{ objectFit: "cover" }} />
      </Card>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>Enter your details below.</Typography>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mb: 3 }}>
            Use email : <strong>hello@hello.com</strong> / password :<strong> hello1234</strong>
          </Alert>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
