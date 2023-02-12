import { useEffect, useState } from "react";
import "./app.css";
import Timer from "./components/timer";
import Trivia from "./components/Trivia";
import Starter from "./components/Starter";
import {data} from "./data"



const App = () => {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1)
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const moneyPyramid = 
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse();
      

      useEffect(() =>{
        questionNumber > 1 && 
        setEarned(moneyPyramid.find((m) => m.id === questionNumber -1).amount);
      },[questionNumber, moneyPyramid])
  
  return (
    <div className="app">

      {username ? (
        <>
         <div className="main">
        {timeOut ? (
          <h1 className="earnedText">you earned:{earned} </h1>
        ) : (

          <>
          <div className="top">
          <div className="timer"><Timer setTimeOut={setTimeOut} questionNumber={questionNumber}/></div>
        </div>
        <div className="bottom">
          <Trivia
          data={data} 
          setQuestionNumber={setQuestionNumber}
          timeOut={timeOut}
          setTimeOut={setTimeOut}
          questionNumber={questionNumber}
          />
        </div>
          </>
        )}

      </div>

      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemNumber">{m.id} </span>
            <span className="moneyListItemAmount">{m.amount} </span>
          </li>
          ))}
        </ul>
      </div>
        </>
        
      ) : <Starter  setUsername={setUsername}/>}
     
    </div>
  );
};

export default App;