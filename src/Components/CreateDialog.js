import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as CONSTANTS from '../Constants';
import { CardContext } from '../Contexts/CardContext';

export default function CreateDialog(props) {

  const [rates, setRates] = useState([]);
  const [fromRate, setFromRate] = useState();
  const [toRate, setToRate] = useState();
  const [color, setColor] = useState("#563d7c");
  const [exchangeRate, setExchangeRate] = useState();

  const { addCard, formatDate } = useContext(CardContext);

  useEffect(() => {
    fetch(`${CONSTANTS.BASE_URL}latest`)
      .then(res => res.json())
      .then(data => {
        const toRates = Object.keys(data.rates)[0];
        setRates([data.base, ...Object.keys(data.rates)]);
        setFromRate(data.base);
        setToRate(toRates);
        setExchangeRate(data.rates[toRates]);
      })
  }, []);

  useEffect(() => {
    fetch(`${CONSTANTS.BASE_URL}convert?from=${fromRate}&to=${toRate}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.info.rate))
  }, [fromRate, toRate])

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard(fromRate, toRate, color, exchangeRate, formatDate(new Date()));
  }

  return (
    <>
      <Modal {...props} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{CONSTANTS.CREATE_DIALOG_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{CONSTANTS.CONVERT_FROM}</Form.Label>
              <Form.Select value={fromRate} name="fromRate" onChange={(e) => setFromRate(e.target.value)}>
                {rates.length > 0 && rates.map((rate, index) => (
                  <option key={index} value={rate}>{rate}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{CONSTANTS.CONVERT_TO}</Form.Label>
              <Form.Select value={toRate} name="toRate" onChange={(e) => setToRate(e.target.value)}>
                {rates.length > 0 && rates.map((rate, index) => (
                  <option key={index} value={rate}>{rate}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{CONSTANTS.CHOOSE_COLOR}</Form.Label>
              <Form.Control type="color" name="color" value={color} title="Choose your color" onChange={(e) => setColor(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            {CONSTANTS.CREATE_DIALOG_CANCEL}
          </Button>
          <Button variant="success" type="submit" onClick={(e) => { handleSubmit(e); props.onHide(); }}>
            {CONSTANTS.CREATE_DIALOG_OK}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}