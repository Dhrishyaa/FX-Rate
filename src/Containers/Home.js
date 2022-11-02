import React, { useState, useContext } from "react";
import AddButton from "../Components/AddButton";
import FXCard from "../Components/FXCard";
import ClearButton from "../Components/ClearButton";
import SortButton from "../Components/SortButton";
import { SORTING_CONTROLS } from "../Constants";
import CreateDialog from "../Components/CreateDialog";
import { CardContext } from '../Contexts/CardContext';
import './Home.css';
//import Alert from "react-bootstrap/Alert";

export default function Home() {
  const containerStyles = {
    display: 'flex',
    gap: 40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

  const { cardList, sortDescending } = useContext(CardContext);

  const [show, setShow] = useState(false);
  //const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleShowAlert = () => {
  //   setShowAlert(true);
  //   setTimeout(() => {
  //     setShowAlert(false);
  //   },2000);
  // }

  // useEffect(() => {
  //   handleShowAlert();
  // }, [cardList]);


  return (
    <>
      <div className="relative">
        <SortButton className="navitem" name={SORTING_CONTROLS.CREATED} sortButtonClick={() => sortDescending('createdAt')} />
        <SortButton className="navitem" name={SORTING_CONTROLS.RATE} sortButtonClick={() => sortDescending('exchangeRate')} />
        <SortButton className="navitem" name={SORTING_CONTROLS.ALPHABET} sortButtonClick={() => sortDescending('fromRate')} />
        <SortButton className="navitem" name={SORTING_CONTROLS.LASTUPDATED} sortButtonClick={() => sortDescending('lastUpdated')} />
        <ClearButton styles={{ borderColor: 'red', marginLeft: '347px' }} />
      </div>
      {/* <Alert show={showAlert} variant="success">
        New Card Created!
      </Alert> */}
      <div style={containerStyles}>
        {cardList.map((element, index) => (
          <FXCard key={index} cardDetails={element} />
        ))}
        <AddButton onClick={handleShow} />
        <CreateDialog show={show} onHide={handleClose} />
      </div>
    </>
  );
}