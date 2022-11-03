import React, { useState, useContext } from "react";
import AddButton from "../Components/AddButton";
import FXCard from "../Components/FXCard";
import ClearButton from "../Components/ClearButton";
import SortButton from "../Components/SortButton";
import { SORTING_CONTROLS } from "../Constants";
import CreateDialog from "../Components/CreateDialog";
import { CardContext } from '../Contexts/CardContext';
import './Home.css';

export default function Home() {
  const containerStyles = {
    display: 'flex',
    gap: 40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

  const { cardList, sorting } = useContext(CardContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="relative">
        <SortButton name={SORTING_CONTROLS.CREATED} sortButtonClick={() => sorting('createdAt')} />
        <SortButton name={SORTING_CONTROLS.RATE} sortButtonClick={() => sorting('exchangeRate')} />
        <SortButton name={SORTING_CONTROLS.ALPHABET} sortButtonClick={() => sorting('fromRate')} />
        <SortButton name={SORTING_CONTROLS.LASTUPDATED} sortButtonClick={() => sorting('lastUpdated')} />
        <ClearButton styles={{ borderColor: 'red', color: 'red', marginLeft: '270px', background: "#ffffff" }} />
      </div>
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