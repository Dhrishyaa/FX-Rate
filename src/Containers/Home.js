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
    gap: 15,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

  const { cardList } = useContext(CardContext);

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
        <SortButton className="navitem" name={SORTING_CONTROLS.CREATED} />
        <SortButton className="navitem" name={SORTING_CONTROLS.RATE} />
        <SortButton className="navitem" name={SORTING_CONTROLS.ALPHABET} />
        <SortButton className="navitem" name={SORTING_CONTROLS.LASTUPDATED} />
        <ClearButton />
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