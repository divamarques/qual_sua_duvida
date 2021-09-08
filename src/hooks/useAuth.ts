//this file was criated to facilitate the usage on context and AuthContex
//this way is easier to import for other files that need this imports 

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth(){
  const value = useContext(AuthContext);

  return value;
}