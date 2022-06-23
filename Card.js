import React, { useState } from "react";
import "./Card.css"

const Card = ({name, image}) => {
    const [{angle, posX, posY}] = useState({
        angle: Math.random() * 90 - 45,
        posX: Math.random() * 40 - 20,
        posY: Math.random() * 40 - 20
    });

    const transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`

    return <img className="Card"
                alt={name}
                src={image}
                style={{transform}}
    />
}

export default Card;