import { TextField, Typography, Button, Box, Alert } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../redux/user/actions";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isSignInError, signInError, isLogIn } = useSelector(
    ({ user }) => user
  );

  useEffect(() => {
    if (isLogIn) {
      navigate("/", { replace: true });
    }
  }, [isLogIn]);

  const signInHandler = () => {
    dispatch(signIn({ email, password }));
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
        <Typography variant="h3">Sign In</Typography>
        {isSignInError ? <Alert severity="error">{signInError}</Alert> : null}
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

        <Button variant="contained" onClick={signInHandler}>
          Sign in
        </Button>
      </Box>
    </Container>
  );
};
