import { Container, Paper, Typography } from "@mui/material";
import * as React from "react";
import "./App.css";
import Search from "./Pages/Search";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  // typographies for custom usage
  theme.typography.h1 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };

  theme.typography.h5 = {
    fontSize: "1.1rem",
    fontWeight: "900",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
    },
  };
  theme.typography.h6 = {
    fontSize: "0.9rem",
    fontWeight: "600",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.15rem",
    },
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            // margin:"auto",
            minHeight: "100vh",
            height: "100%",
            width: "100%",
            // display: "flex",
            padding: "1rem 0.1rem",
            bgcolor: "background.default",
            // bgcolor: "black",
            color: "text.primary",
          }}
        >
          <Paper
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              margin: "0.5rem 0",
            }}
            elevation={3}
          >
            <Typography variant="h1" sx={{ fontWeight: "900" }}>
              GitHub Profile Finder
            </Typography>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <BsMoonFill /> : <BsSunFill />}
            </IconButton>
          </Paper>
          <Search />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
