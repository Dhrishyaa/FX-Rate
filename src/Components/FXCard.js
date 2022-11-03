import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardContext } from '../Contexts/CardContext';
import CardFields from './CardFields';
import { CgArrowsVAlt } from 'react-icons/cg';
import { IoMdCloseCircleOutline, IoMdRefresh } from 'react-icons/io';

export default function FXCard(props) {
  const { cardDetails } = props;
  const { updateCard, deleteCard } = useContext(CardContext);
  const textStyles = {
    backgroundColor: cardDetails.color,
    border: cardDetails.color,
    margin: '20px 0px 0px -5px',
    width: '220px',
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
  const labelStyles = {
    fontSize: '25px',
    fontFamily: '-webkit-body',
    fontWeight: 'bold'
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
            <Typography style={labelStyles} color={cardDetails.color}>
              {cardDetails.fromRate}
            </Typography>
            <CgArrowsVAlt size='80px' color='#7c7c7c' style={{
              color: "#7c7c7c",
              strokeWidth: "1px",
              stroke: "white",
              marginTop: '20px'
            }} />
            <Typography style={{
              ...labelStyles,
              position: "absolute",
              margin: "25px 0px 0px 10px"
            }} color={cardDetails.color}>
              {cardDetails.toRate}
            </Typography>
          </div>
          <div style={{ marginTop: '88px', marginLeft: '-25px' }}>{cardDetails.exchangeRate}</div>
          <div>
            <CardFields styles={{ ...textStyles, marginTop: '47px' }} amount={fromAmount} onChangeAmount={handleFromAmountChange} />
            <CardFields styles={textStyles} amount={toAmount} onChangeAmount={handleToAmountChange} />
          </div>
        </div>
        <div style={{ position: 'relative', float: 'right', margin: '15px 0px 10px' }}>
          <Typography style={{ marginLeft: '55px', color: '#7c7c7c' }}>
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
