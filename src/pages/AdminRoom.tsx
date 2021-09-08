import { useHistory, useParams } from "react-router-dom";

import logoImg  from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
// import { useAuth } from "../hooks/useAuth";

import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import '../styles/room.scss';


type RoomParams = {
  id: string;
}

export function AdminRoom(){

  const history = useHistory();
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId)

  async function HandleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    })

    history.push('/');
  }

//Function that handles deleting a question for the admin
  async function handleDeleteQuestion(questionId: string){
   if (window.confirm('Are you sure you want to delete')){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
   }
  }


  return (

   <div id="page-room">
     <header>
       <div className="content">
         <img src={logoImg} alt="Logo Letmeask" />
          <div>
            <RoomCode code ={roomId}/>
            <Button isOutlined onClick={HandleEndRoom}>Encerrar sala</Button>
          </div>
       </div>
     </header>

     <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
              key={question.id} 
              content={question.content}
              author={question.author}
              >
                <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
     </main>
   </div>
  );
}