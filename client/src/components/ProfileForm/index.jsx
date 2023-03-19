/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setUserAvatar, setUserBio, setUserName, setUserSurname, updateUser, updateUserAC,
} from '../../store/profileReducer/actions';

export function ProfileForm() {
  const err = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedUser = useSelector((state) => state.profile.user);
  const userId = useSelector((state) => state.auth.user);

  console.log(updatedUser.surname, '5555555555');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data, 'here dats');

    const avatar = data.get('avatar');
    const name = data.get('name');
    const surname = data.get('surname');
    const email = data.get('email');
    const bio = data.get('bio');

    const id = userId.id;

    dispatch(
      updateUser({
        id: id,
        avatar: avatar,
        name: name,
        surname: surname,
        email: email,
        bio: bio,
      }),
    );
    navigate('/profile');
  };

  const onChangeName = (ev) => {
    dispatch(setUserName(ev.target.value));
  };

  const onChangeAvatar = (ev) => {
    dispatch(setUserAvatar(ev.target.value));
  };

  const onChangeSurname = (ev) => {
    dispatch(setUserSurname(ev.target.value));
  };

  const onChangeBio = (ev) => {
    dispatch(setUserBio(ev.target.value));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Change your profile
        </Typography>
        <Typography component="h1" variant="h6" color="red">
          {err && <>Incorrect Email or Password</>}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          {updatedUser ? (
            <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="avatar"
            name="avatar"
            onChange={onChangeAvatar}
            value={updatedUser.avatar}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            onChange={onChangeName}
            value={updatedUser.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            name="surname"
            autoComplete="surname"
            onChange={onChangeSurname}
            value={updatedUser.surname}
          />
              <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            value={userId.email}
              />
          <TextField
            margin="normal"
            required
            fullWidth
            name="bio"
            id="bio"
            onChange={onChangeBio}
            value={updatedUser.bio}
          />
          </>
          ) : (
            <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="avatar"
            label="Avatar"
            name="avatar"
          />
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
            name="bio"
            label="Bio"
            id="bio"
            />
          </>
          )}
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
