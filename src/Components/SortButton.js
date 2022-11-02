import React from "react";
import { SORTBY } from "../Constants";
import { Button } from "@mui/material";

export default function SortButton(props) {
    const { name } = props;
    return (
        <Button variant="outlined">{SORTBY} {name}</Button>
    );
}