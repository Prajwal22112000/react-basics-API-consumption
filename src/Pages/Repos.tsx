/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { MdExpandMore } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

type repoObject = {
  index: number;
  key: number;
  full_name: string;
  description: string;
  forks: number;
  watchers: number;
  language: string;
};

const Item = styled(Typography)(({ theme }) => ({
  padding: "0.25rem 0.5rem",
  margin: "0.25rem auto",
}));

const Repos = (props: repoObject) => {
  return (
    <>
      <Accordion
        elevation={3}
        sx={{ margin: "0.5rem 0", padding: "0rem", borderRadius: "0.25rem", width:"100%" }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ overflow: "hidden" }}
        >
          <Item variant="h5" sx={{ fontWeight: "700", margin: "0" }}>
            {props.index + 1 + ". " + props.full_name}
          </Item>
        </AccordionSummary>
        <AccordionDetails>
          <Item variant="h6">Project Description</Item>
          <Item variant="body1">
            {props.description ? props.description : "N/A"}
          </Item>
          <hr />
          <Item variant="h6">Forks</Item>
          <Item variant="body1">{props.forks}</Item>
          <hr />
          <Item variant="h6">Watchers</Item>
          <Item variant="body1">{props.watchers}</Item>
          <hr />
          <Item variant="h6">Language</Item>
          <Item variant="body1">{props.language ? props.language : "N/A"}</Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Repos;
