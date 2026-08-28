import { useEffect } from "react";
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currency = '$'
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_")
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }
    const calculateAge = (dob) => {
        const today = new Date()
        const birtDate = new Date(dob)
        let age = today.getFullYear() - birtDate.getFullYear()
        return age
    }
    const value = {
        calculateAge,
        slotDateFormat,
        months,
        currency
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;