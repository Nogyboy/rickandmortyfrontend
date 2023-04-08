import React, { useEffect, useState } from "react"; 

import useFetchCharacters from "../hooks/useFetchCharacters";
import { Combobox } from '@headlessui/react'
import Spinner from "../components/Spinner";


const Search = () => {
    const [render, setRender] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<any>(null)
    const [query, setQuery] = useState<any>(null)  
    const { characters, error, setPage, page, setName, name, clearName }: any = useFetchCharacters();
 

    const handleClearSearch = () => {
        setName("");
        setPage(1)
        setQuery(null); 
        window.location.reload();
    }

    useEffect(() => {
        setRender(false)
        if (query !== null && query !== undefined && characters !== undefined && characters.results && characters.results.length > 0 && error === null && error !== "Error" && query.length > 0) {
            setName(query);
            setRender(true);
        } else if (error === "Error" && characters.length === 0) {
            setName("");
            setRender(false);
        } else {
            setRender(false);
        }
    }, [query]);

    return (
        <>
            <div className="relative pt-8 pb-6">
                <div className="relative">
                    <Combobox value={selectedPerson} onChange={setSelectedPerson} >
                        <Combobox.Input
                            className="w-full px-4 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                            placeholder="Search for a character"
                            onChange={(event:any) => {
                                const inputValue = event.target.value;
                                if (inputValue === null || inputValue === undefined) {
                                    setQuery(null);
                                } else {
                                    setQuery(inputValue);
                                }
                            }}
                        />
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-0 top-0 bg-gray-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded-l-full"
                        >
                            Delete
                        </button>
                         
                    </Combobox>

                </div>
            </div>

        </>
    )
}

export default Search;
