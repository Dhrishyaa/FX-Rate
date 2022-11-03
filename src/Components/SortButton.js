import React, { useContext } from "react";
import { SORTBY } from "../Constants";
import { Button } from "@mui/material";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { CardContext } from "../Contexts/CardContext";

export default function SortButton(props) {
  const { name, sortButtonClick } = props;
  const { sortType } = useContext(CardContext);
  return (
    <Button variant="outlined" onClick={sortButtonClick} style={{ background: "#ffffff" }}>
      {SORTBY} {name}
      <div style={{ position: "relative", marginLeft: '5px' }}>
        {(sortType === "asc") ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
      </div>
    </Button>
  );
}