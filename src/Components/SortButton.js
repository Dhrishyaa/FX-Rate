import React from "react";
import { SORTBY } from "../Constants";
import { Button } from "@mui/material";

export default function SortButton(props) {
  const { name, sortButtonClick } = props;
  return (
    <Button variant="outlined" onClick={sortButtonClick}>{SORTBY} {name}</Button>
  );
}