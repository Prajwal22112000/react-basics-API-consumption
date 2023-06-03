/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type errorProp = {
  username: string;
  statusCode: string;
};

const Item = styled(Typography)(({ theme }) => ({
  padding: "0.5rem  0",
}));

const ErrorPage = (props: errorProp) => {
  return (
    <>
      {console.log(props.username)}
      <Stack>
        <Paper elevation={3} sx={{ padding: "1rem", margin: "0.5rem 0" }}>
          <Item variant="h4">OOPS! Can't find {props.username} on GitHub</Item>
          <Item variant="h6">Error Code{": " + props.statusCode}</Item>
        </Paper>
      </Stack>
    </>
  );
};

export default ErrorPage;
