import React, { useContext } from "react";
import { CLEAR } from "../Constants";
import { Button } from "@mui/material";
import { CardContext } from "../Contexts/CardContext";

export default function ClearButton() {
    const { deleteAllCards } = useContext(CardContext);
    return (
        <Button variant="outlined" onClick={deleteAllCards}>{CLEAR}</Button>
    );
}