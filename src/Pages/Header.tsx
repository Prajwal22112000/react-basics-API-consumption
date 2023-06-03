import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { Paper, Typography } from "@mui/material";

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const Header = () => {
//   const [mode, setMode] = React.useState<"light" | "dark">("light");
//   const colorMode = React.useMemo(
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

  return <>
  <Paper sx={{ width: "100%", textAlign: "center", my: "1rem" }} elevation={3}>
    <Typography variant="h3">GitHub Profile Finder</Typography>
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <BsMoonFill /> : <BsSunFill />}
    </IconButton>
  </Paper>;
      </>
};

export default Header;
