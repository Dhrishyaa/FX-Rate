import React from 'react'
import { TextField } from '@mui/material';

export default function CardFields({ styles, amount, onChangeAmount }) {
  return (
    <div>
      {/* <TextField
        label="field"
        variant="outlined"
        style={styles}
        value={amount}
        onChange={onChangeAmount}
      /> */}
      <input type = "text" style={styles} value={amount} onChange={onChangeAmount}/>
    </div>
  )
}
