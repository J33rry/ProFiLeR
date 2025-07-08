"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { GetData } from "@/util/GetData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await GetData();
            setData(result);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider
            value={{ data, loading, error, refreshData: fetchData }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
