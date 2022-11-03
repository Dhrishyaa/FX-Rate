import React from 'react'

export default function CardFields({ styles, amount, onChangeAmount }) {
  return (
    <div>
      <input type = "text" style={styles} value={amount} onChange={onChangeAmount}/>
    </div>
  )
}
