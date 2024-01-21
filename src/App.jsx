import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    const [highScore, setHighScore] = React.useState(()=>{
        if (localStorage.getItem("highScore")){ //if it exists get it
            return JSON.parse(localStorage.getItem("highScore"))
        } else { // if not, set it
            localStorage.setItem("highScore","1000000")
            return 1000000
        }
    })
    const [time, setTime] = React.useState(()=>{
        if (localStorage.getItem("bestTime")){ //if it exists get it
            return JSON.parse(localStorage.getItem("bestTime"))
        } else { // if not, set it
            localStorage.setItem("bestTime","1000000")
            return 1000000
        }
    })

    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    // React.useEffect(()=>{

    // },[time])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount((prevCount)=>prevCount+1)
            // setTime(Date.now())
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setHighScore((prev)=>{
                let high = rollCount<prev?rollCount:prev
                localStorage.setItem("highScore", JSON.stringify(high))
                return high})
            setRollCount(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <p>Rolls: {rollCount}       |       BestScore: {highScore}</p>
            <p>Time:{time} Best-Time:</p>
        </main>
    )
}