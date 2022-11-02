import React from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'

export default function AddButton(props) {
    const { onClick } = props;
    return (
        <Fab color="primary" aria-label="add" onClick={onClick}>
            <AddIcon />
        </Fab>
    );
}