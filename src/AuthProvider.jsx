// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [status, setStatus] = useState("logout");

    const login = () => {
        setStatus(localStorage.getItem("status"))
    };

    const logout = () => {
        setStatus(localStorage.getItem("status"))
    };

    return (
        <AuthContext.Provider value={{ status, login, logout }}>
            {children}
        </AuthContext.Provider>
);
};

export { AuthContext, AuthProvider };

