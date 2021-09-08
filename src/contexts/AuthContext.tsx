import firebase from "firebase/compat";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";


type User = {
  id: string;
  name: string;
  avatar: string;
}

// o type User substitui o valor de object dentro do type AuthContext
// ele também é um objeto mas agora User atribuido a user, deixando de ser um objeto genérico

type AuthContext = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  //Since the properties are actually components, you should use import ReactNode from react in order to function
  children: ReactNode;
}
//Contexto em React, serve para compartilhar informações entre dois ou mais componentes
// o valor deve conter a informação com a qual ele vai trabalhar ex( string, number, objeto, array)
// the 'as any' property is just a little 'hack' to 'enable problems with typescript sintax
export const AuthContext = createContext({} as AuthContext);


export function AuthContextProvider(props: AuthContextProviderProps){

   //Para criação de um valor não estático, faça isso:
   const [user, setUser]  = useState<User>();

   //using the useEffect on this case, helps monitor the authentication process that once was made for the user.
   // it's called Recovery Authentication of state, it's allways checking if the user is already authenticated or not
   useEffect(() => {
   //in react is recomended that we save the eventlistener in a variable when it's inside a useEffect so we can 'turn off' the event listener
   //it's recomended that we return a function on the useEffect, that unregester all eventlisteners registered
     const unsubscribe = auth.onAuthStateChanged(user =>{
       if(user){
       const {displayName, photoURL, uid} = user;
 
       if(!displayName || !photoURL) {
         throw new Error("Missing information from Google Account.");
         
       }
 
       setUser({
         id: uid,
         name: displayName,
         avatar: photoURL
       })
       }
     })
 
     return () => {
       unsubscribe();
     }
   }, [])
 
   async function signInWithGoogle() {
      // autenticação do usuário (firebase)
     //signInWithPopoup, does not redirect to the google page for signing in, it provides a pop-up
     // on the same page to facilitate usage for users.
 
     const provider = new firebase.auth.GoogleAuthProvider();
 
     const result = await auth.signInWithPopup(provider);
 
     
     if (result.user) {
       const {displayName, photoURL, uid} = result.user;
 
       if(!displayName || !photoURL) {
         throw new Error("Missing information from Google Account.");
         
       }
 
       setUser({
         id: uid,
         name: displayName,
         avatar: photoURL
       })
     }
   }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>

    {props.children}
    </AuthContext.Provider>

  );
}