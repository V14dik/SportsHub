import { TextField, Typography, Button, Box, Grid, Alert } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegistration } from "../redux/user/actions";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isRegisterError, registerError, isLogIn } = useSelector(
    ({ user }) => user
  );

  useEffect(() => {
    if (isLogIn) {
      navigate("/", { replace: true });
    }
  }, [isLogIn]);

  const registerHandler = () => {
    dispatch(userRegistration({ username, email, password }));
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h3">Sign Up</Typography>
        {isRegisterError ? (
          <Alert severity="error">{registerError}</Alert>
        ) : null}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Grid container>
          <Grid item sm={4}>
            <Button variant="outlined" component="label">
              Upload avatar
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item sm={4}>
            <Button variant="contained" onClick={registerHandler}>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
