import { useEffect, useState } from "react"
import "../components/trivia.css"
import useSound from "use-sound";
import play from "../assests/sounds/play.mp3";
import correct from "../assests/sounds/correct.mp3";
import wrong from "../assests/sounds/wrong.mp3";

export default function Trivia({
    data,
    setQuestionNumber,
    timeOut,
    setTimeOut,
    questionNumber
}){
        // calling the first question and question number
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    const [backgroundpaly] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() => {
        backgroundpaly();
      }, [backgroundpaly]);


    useEffect(() =>{
        setQuestion(data[questionNumber- 1]);
    }, [data, questionNumber] );

    const delay = ( duration, callback) =>{
        setTimeout(() =>{
            callback();
        }, duration);
    }

    const handleClick =(answer) => {

        setSelectedAnswer(answer);
        setClassName("answer active");
        delay(3000, () =>
            setClassName(answer.correct ? "answer correct" : "answer wrong")
        );
        delay(6000, () =>{
            if (answer.correct) {
                correctAnswer();
                delay(1000, () =>{
                    setQuestionNumber((prev) => prev + 1);
                });
            } else{
                wrongAnswer();
                delay(1000, () => {
                  setTimeOut(true);
                });
            }
        });

        
    };

    return(
   <div className="trivia">
    <div className="question">{question?.question}</div>
    <div className="answers">
        {question?.answers.map((answer) =>(
        <div className={selectedAnswer === answer ? className : "answer"}
        onClick={() => handleClick(answer)} >
            {answer.text}
            </div>
        ))}
    </div>
   </div>
    )
}