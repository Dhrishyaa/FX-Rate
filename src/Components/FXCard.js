import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HeightIcon from '@mui/icons-material/Height';
import RefreshIcon from '@mui/icons-material/Refresh';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { CardContext } from '../Contexts/CardContext';
import CardFields from './CardFields';
import { CgArrowsVAlt } from 'react-icons/cg';
import { IoMdCloseCircleOutline, IoMdRefresh } from 'react-icons/io';

export default function FXCard(props) {
  const { cardDetails } = props;
  const { updateCard, deleteCard } = useContext(CardContext);
  //console.log("cardDetails "+ JSON.stringify(cardDetails));
  const textStyles = {
    backgroundColor: cardDetails.color,
    border: cardDetails.color,
    margin: '20px 0px 0px 15px',
    width: '230px',
    height: '45px',
    borderRadius: '6px',
    padding: '10px'
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
    <Card sx={{ maxWidth: 400, borderRadius: '15px' }}>
      <CardContent>
        <div style={actionButtonStyles}>
          <IoMdRefresh onClick={() => updateCard(cardDetails.id, cardDetails)} size='25px' color='#7c7c7c' />
          <IoMdCloseCircleOutline onClick={() => deleteCard(cardDetails.id)} size='25px' color={cardDetails.color} />
        </div>
        <div style={containerStyles}>
          <div>
            <Typography style={{
              fontSize: '25px',
              fontFamily: '-webkit-body',
              fontWeight: 'bold'
            }} color={cardDetails.color}>
              {cardDetails.fromRate}
            </Typography>
            <CgArrowsVAlt />
            <Typography style={{
              position: "absolute",
              marginTop: "110px",
              fontSize: '25px',
              fontFamily: '-webkit-body',
              fontWeight: 'bold'
            }} color={cardDetails.color}>
              {cardDetails.toRate}
            </Typography>
          </div>
          <div style={{ marginTop: '88px', marginLeft: '-25px' }}>{cardDetails.exchangeRate}</div>
          <div>
            <CardFields styles={{ ...textStyles, margin: '47px 0px 0px 15px' }} amount={fromAmount} onChangeAmount={handleFromAmountChange} />
            <CardFields styles={textStyles} amount={toAmount} onChangeAmount={handleToAmountChange} />
          </div>
        </div>
        <div style={{ position: 'relative', float: 'right', margin: '15px 0px 10px' }}>
          <Typography style={{marginLeft: '55px', color:'#7c7c7c'}}>
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
