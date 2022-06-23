import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css"

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

/* Deck: uses deck API, allows drawing card at a time. */

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const timerRef = useRef(null);

  /* At mount: load deck from API into state. */
  useEffect(() => {
    async function getData() {
      let d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    getData();
  }, [setDeck]);

  const handleDrawCard = async () => {
    let c = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
    setDrawn([...drawn, ...c.data.cards]);
  }
//   useEffect(() => {
//     async function drawCard() {
//         let c = await axios.get(`${API_BASE_URL}/deck/${deck.deck_id}/draw/`);
//         setDrawn(c.data.cards);
//     }
//     drawCard();
//   }, [setDrawn]);

  const cards = drawn.map(c => (
    <Card key={c.code} name={c.name} image={c.image} value={c.value} suit={c.suit} />
  ));

  return (
    <div className="Deck">
      {deck ? (
        <button className="Deck-gimme" onClick={handleDrawCard}>Draw Card
        </button>
      ) : null}
      <div className="Deck-cardarea">{cards}</div>
    </div>
  );
}

export default Deck;