import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HeightIcon from '@mui/icons-material/Height';
import RefreshIcon from '@mui/icons-material/Refresh';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { CardContext } from '../Contexts/CardContext';
import CardFields from './CardFields';

export default function FXCard(props) {
  const { cardDetails } = props;
  const { updateCard, deleteCard } = useContext(CardContext);
  //console.log("cardDetails "+ JSON.stringify(cardDetails));
  const textStyles = {
    backgroundColor: cardDetails.color,
    marginTop: '20px'
  };
  const containerStyles = {
    display: 'flex',
    gap: 15
  }
  const actionButtonStyles = {
    position: 'relative',
    float: 'right'
  }

  const [amount, setAmount] = useState(1);
  const [fromRateFieldChanged, setFromRateFieldChanged] = useState(true);

  let fromAmount, toAmount;
  if (fromRateFieldChanged) {
    fromAmount = amount;
    toAmount = amount * cardDetails.exchangeRate
  } else {
    toAmount = amount;
    fromAmount = amount / cardDetails.exchangeRate
  }

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setFromRateFieldChanged(true);
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setFromRateFieldChanged(false);
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <div style={actionButtonStyles}>
          <RefreshIcon onClick={() => updateCard(cardDetails.id, cardDetails)} />
          <HighlightOffSharpIcon onClick={() => deleteCard(cardDetails.id)} color="success" />
        </div>
        <div style={containerStyles}>
          <div>
            <Typography color={cardDetails.color}>
              {cardDetails.fromRate}
            </Typography>
            <HeightIcon />
            <Typography style={{
              position: "absolute",
              marginTop: "120px"
            }} color={cardDetails.color}>
              {cardDetails.toRate}
            </Typography>
          </div>
          {cardDetails.exchangeRate}
          <div>
            <CardFields styles={textStyles} amount={fromAmount} onChangeAmount={handleFromAmountChange} />
            <CardFields styles={textStyles} amount={toAmount} onChangeAmount={handleToAmountChange} />
          </div>
        </div>
        <div style={{ position: 'relative', float: 'right', margin: '15px 0px 10px' }}>
          <Typography>
            Last Updated
          </Typography>
          <Typography>
            {cardDetails.lastUpdated}
          </Typography>
        </div>

      </CardContent>
    </Card>
  );
}
