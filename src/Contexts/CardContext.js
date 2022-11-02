import React, { createContext, useState } from "react";
import { v4 as uuid } from 'uuid';
import { BASE_URL } from "../Constants";

export const CardContext = createContext();

const CardContextProvider = (props) => {
    const [cardList, setCardList] = useState([{
        id: uuid(),
        fromRate: "AED",
        toRate: "BND",
        color: "#A37CDF",
        exchangeRate: 0.387453,
        createdAt: "1-NOV-2022 23:0:20",
        lastUpdated: "1-NOV-2022 23:0:20"
    }]);

    const formatDate = (date) => {
        return (
            [
                date.getDate(),
                date.toLocaleString('en-us', { month: 'short' }).toUpperCase(),
                date.getFullYear(),
            ].join('-') +
            ' ' +
            [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ].join(':')
        )
    }

    const addCard = (fromRate, toRate, color, exchangeRate, createdAt) => {
        setCardList([...cardList, {
            id: uuid(),
            fromRate,
            toRate,
            color,
            exchangeRate,
            createdAt,
            lastUpdated: createdAt
        }])
    }
    const updateCard = (id, updatedCard) => {
        fetch(`${BASE_URL}convert?from=${updatedCard.fromRate}&to=${updatedCard.toRate}`)
            .then(res => res.json())
            .then(data => {
                var updatedCardAfter = { ...updatedCard, exchangeRate: data.info.rate, lastUpdated: formatDate(new Date()) }
                setCardList(cardList.map((card) => card.id === id ? updatedCardAfter : card))
            })

    }

    const deleteCard = (id) => {
        setCardList(cardList.filter(card => card.id !== id))
    }

    const deleteAllCards = () => {
        setCardList([]);
    }

    return (
        <CardContext.Provider value={{ cardList, addCard, deleteCard, updateCard, formatDate, deleteAllCards }}>
            {props.children}
        </CardContext.Provider>
    )
}

export default CardContextProvider;