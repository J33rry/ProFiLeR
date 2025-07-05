"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { GetData } from "@/util/GetData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const result = await GetData();
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, loading, refreshData: fetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
