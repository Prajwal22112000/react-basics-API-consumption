/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Repos from "./Repos";
import axios from "axios";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  Pagination,
} from "@mui/material";
import {
  BiUserCircle,
  BiDetail,
  BiCurrentLocation,
  BiGitRepoForked,
} from "react-icons/bi";
import LoadingButton from "@mui/lab/LoadingButton";
import "../index.css";

type GitHubProfileProp = {
  username: string;
  name: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  reposCount: number;
  dp: string;
  reposURL: string;
};

const Item = styled(Paper)(({ theme }) => ({
  margin: "0.25rem 0 0.5rem",
  padding: "1rem",
}));

const Profile = (props: GitHubProfileProp) => {
  const [ReopDetails, setReopDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoading(true);
    setPage(value);
    fetchRepos(value);
  };

  async function fetchRepos(value: number) {
    setPage(value);
    const url: string = props.reposURL + "?page=" + value + "&per_page=10";
    console.log(url);
    await axios
      .get(url)
      .then((value: any) => {
        console.log(value);
        setReopDetails(value.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <>
      <Stack sx={{ width: "100%", margin: "0.5rem auto" }}>
        <Item
          elevation={4}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            textAlign: "center",
            alignItems:"center"
          }}
        >
          <Container>
            <Avatar
              alt="UserName Picture"
              src={props.dp}
              sx={{ margin: "auto", height: "6rem", width: "6rem" }}
            />
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {props.name}
            </Typography>
          </Container>
          <Container>
            <Typography variant="h6">Followers</Typography>
            <hr />
            <Typography variant="body1">{props.followers}</Typography>
          </Container>
          <Container>
            <Typography variant="h6">Following</Typography>
            <hr />
            <Typography variant="body1">{props.following}</Typography>
          </Container>
        </Item>
        <Item elevation={4}>
          <Typography variant="h6">
            <BiUserCircle className="inline-block mb-1 mr-1" />
            GitHub Username
          </Typography>
          <hr />
          <Typography variant="body1">
            {props.username ? props.username : "N/A"}
          </Typography>
        </Item>
        <Item elevation={4}>
          <Typography variant="h6">
            <BiDetail className="inline-block mb-1 mr-1" />
            Bio
          </Typography>
          <hr />
          <Typography variant="body1">
            {props.bio ? props.bio : "N/A"}
          </Typography>
        </Item>
        <Item elevation={4}>
          <Typography variant="h6">
            <BiCurrentLocation className="inline-block mb-1 mr-1" />
            Lives In
          </Typography>
          <hr />
          <Typography variant="body1">
            {props.location ? props.location : "N/A"}
          </Typography>
        </Item>
        <Item elevation={4}>
          <Typography variant="h6">
            <BiGitRepoForked className="inline-block mb-1 mr-1" />
            Public Repositories
          </Typography>
          <hr />
          <Typography variant="body1">{props.reposCount}</Typography>
        </Item>
        {props.reposCount > 0 ? (
          <>
            {loading ? (
              <LoadingButton
                loading
                variant="outlined"
                color="success"
                onClick={() => {
                  fetchRepos(1);
                }}
                sx={{
                  margin: "0.5rem auto 0",
                }}
              >
                Loading
              </LoadingButton>
            ) : (
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  fetchRepos(1);
                  setLoading(true);
                }}
                sx={{
                  margin: "0.5rem auto 0",
                }}
              >
                {page === 0 ? "Click Here To Fetch The Repos" : "Loaded"}
              </Button>
            )}
            {page !== 0 && (
              <>
                <Item
                  elevation={4}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Page: {page}</Typography>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                    count={Math.ceil(props.reposCount / 10)}
                    color="primary"
                    size="small"
                    showFirstButton
                    showLastButton
                    sx={{ minWidth: "3rem", margin: "auto" }}
                  />
                  {ReopDetails.map((data: any, index) => {
                    return (
                      <>
                        <Repos
                          key={index}
                          index={(page - 1) * 10 + index}
                          full_name={data.full_name}
                          description={data.description}
                          forks={data.forks}
                          watchers={data.watchers}
                          language={data.language}
                        />
                      </>
                    );
                  })}
                </Item>
              </>
            )}
          </>
        ) : (
          <Button variant="outlined" color="error" disableElevation>
            Nothing to Fetch
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Profile;
