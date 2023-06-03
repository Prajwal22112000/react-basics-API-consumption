/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Profile from "./Profile";
import { TextField, Paper } from "@mui/material";
import ErrorPage from "./ErrorPage";
import { BiSearch } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";

const SearchPage = () => {
  const [username, setusername] = useState("");
  const [errorCode, setErrorCode] = useState("0");
  const [ProfileExist, setProfileExist] = useState(false);
  const [searching, setSearching] = useState(false);

  const [profile, setprofile] = useState({
    ProfileFound: false,
    login: "",
    name: "",
    bio: "",
    location: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    avatar_url: "",
    repos_url: "",
  });

  async function FindUser(event: any) {
    event.preventDefault();
    console.log("find user called");
    setSearching(true);

    await axios
      .get("https://api.github.com/users/" + username)
      .then((value: any) => {
        setprofile(value.data);
        setProfileExist(true);
        setErrorCode("none");
        setSearching(false);
        console.log(value.data);
      })
      .catch((err: any) => {
        setSearching(false);
        setProfileExist(false);
        setErrorCode(err.code);
        console.log(err.code);
      });
  }

  const SaveUsername = (value: any) => {
    setusername(value.target.value);
    console.log(username);
  };
  //return statement from here
  return (
    <>
      <Paper sx={{ width: "100%", p: "1rem" }} elevation={3}>
        <form onSubmit={FindUser} className="w-full">
          <TextField
            label="Enter Username"
            variant="standard"
            onChange={SaveUsername}
            sx={{
              width: "100%",
            }}
          />
          {searching ? (
            <LoadingButton
              loading
              loadingPosition="end"
              endIcon={<BiSearch />}
              variant="outlined"
              size="small"
              color="secondary"
              sx={{
                margin: "1rem auto 0",
              }}
            >
              Searching...
            </LoadingButton>
          ) : (
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              type="submit"
              endIcon={<BiSearch />}
              sx={{
                margin: "1rem auto 0",
              }}
            >
              Search
            </Button>
          )}
        </form>
      </Paper>
      {ProfileExist === true && (
        <Profile
          username={profile.login}
          name={profile.name}
          bio={profile.bio}
          location={profile.location}
          followers={profile.followers}
          following={profile.following}
          reposCount={profile.public_repos}
          dp={profile.avatar_url}
          reposURL={profile.repos_url}
        />
      )}
      {(errorCode === "ERR_BAD_REQUEST" || errorCode == "ERR_NETWORK") && (
        <ErrorPage statusCode={errorCode} username={username} />
      )}
    </>
  );
};

export default SearchPage;
