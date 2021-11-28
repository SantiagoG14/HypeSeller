import React, {useState, useEffect, useContext} from 'react'
import { auth, firestore } from '../firebase'

const Context = React.createContext()

export function useApp() {
    return useContext(Context)
}

export default function AppContext({ children }) {

    const [userCredentials, setUserCredentials] = useState({user: null})
    const [shoppingBag, setShoppingBag] = useState({bag: null})

    useEffect(()=>{
        let isSubscribed = true
        let unsubscribe = ''
        if(isSubscribed){
            auth.signInAnonymously().then(userCredentials => {
                setUserCredentials(userCredentials)

                const bagRef = firestore.collection('bags').doc(userCredentials.user.uid)
                const isNewUser = userCredentials.additionalUserInfo.isNewUser
                if(isNewUser) {
                    unsubscribe = bagRef.set({bag:[]}).then(() => bagRef.onSnapshot((snapshot) => {
                        setShoppingBag({...snapshot.data()})
                    }))
                }else {
                    unsubscribe = bagRef.onSnapshot((snapshot) => {
                        setShoppingBag({...snapshot.data()})
                    })
                }
            })
        }
        return () => {
            isSubscribed = false
            unsubscribe()
        }
    },[])

    const value = {
        userCredentials,
        shoppingBag,
    }

    return (
        <Context.Provider value={value}>
            {userCredentials.user && shoppingBag.bag && children}
        </Context.Provider>
    )
}
