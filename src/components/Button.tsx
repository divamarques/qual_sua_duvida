import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};
//

export function Button ({isOutlined = false, ...props}: ButtonProps){
  return (
    //Repass of props, take all the props from ButtonProps, using the spread operator {...props}
    //using the ButtonHTMLAttributes from the react lib, in a typescript matter to acesse all of the HTML atributes tha a button can have
    <button 
      className={`button ${isOutlined ? 'outline' : ''}`}
      {...props} 
    />
  )
}

