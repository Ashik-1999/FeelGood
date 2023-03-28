import {createContext, useState} from 'react'

const CounselorAuthContext = createContext({})

export const CounselorAuthProvider = ({children}) =>{
    const [counselorAuth,setcounselorAuth] = useState({});

    return(
        <CounselorAuthContext.Provider value={{counselorAuth,setcounselorAuth}}>
            {children}
        </CounselorAuthContext.Provider>
    )
}

export default CounselorAuthContext