import { createContext, useState } from "react";


export const GlobalContext = createContext()

export const MyState =({children})=>{
     const [count , setCount] = useState(0)

     const value ={
        count ,setCount
     }

     return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}