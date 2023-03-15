import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, updateUserAC } from "../../store/profileReducer/actions";

export function ProfileForm() {
  const err = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedUser = useSelector((state) => state.profile.user);
  const userId = useSelector((state) => state.auth.user);

  console.log(updatedUser, userId, "5555555555");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data, "here dats");

    const name = data.get("name");
    const surname = data.get("surname");
    const email = data.get("email");
    const password = data.get("password");
    const bio = data.get("bio");

    const id = userId.id;

    dispatch(
      updateUser({
        id: id,
        name: name,
        surname: surname,
        email: email,
        password: password,
        bio: bio,
      })
    );
    navigate("/profile");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change your profile
        </Typography>
        <Typography component="h1" variant="h6" color="red">
          {err && <>Incorrect Email or Password</>}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Surname"
            name="surname"
            autoComplete="surname"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            // label="Email Address"
            name="email"
            autoComplete="email"
            value={userId.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={userId.password}
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="bio"
            label="Bio"
            id="bio"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm the changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
