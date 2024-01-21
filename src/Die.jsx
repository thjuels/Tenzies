import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className={`die-face`} 
            style={styles}
            onClick={props.holdDice}
        >
        <img src={`/src/assets/dice-six-faces-${props.value}.svg`} className="face"/>
        </div>
    )
}