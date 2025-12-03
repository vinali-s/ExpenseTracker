import React, {Children, createContext, useState} from "react";

export const UserContext = createContext();

const UserProvider = ({ Children}) => {
    const [user, setUser] = useState(null);

    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //function to clear user data
    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser
        }}
        >
            {Children}
        </UserContext.Provider>
    );
}

export default UserProvider;