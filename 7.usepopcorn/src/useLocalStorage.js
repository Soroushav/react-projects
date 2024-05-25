import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key){
    const [value, setValue] = useState(function(){
        const items = JSON.parse(localStorage.getItem(key));
        return items ? items : initialState;
      });
    useEffect(function(){
        localStorage.setItem(key, JSON.stringify(value));
      }, [value])
      return [value, setValue];
}