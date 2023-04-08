import React, { useEffect, useState } from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";
import { Combobox } from '@headlessui/react'

import Spinner from "../components/Spinner";


const Search = () => {
    const [render, setRender] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null)

    const { characters, loading, error, setPage, page, setName, name, clearName, setID }: any = useFetchCharacters();
    console.log("🚀 ~ file: Search.tsx:14 ~ Search ~ characters:", characters)

    const handleClearSearch = () => {

        if (error === null) {
            clearName();
            setPage(1)
        }

    }

    useEffect(() => {
        setRender(false)
        if (characters !== undefined && characters && characters.results && characters.results.length > 0 && error === null) {
            setRender(true);

        } else {
            setRender(false);
        }
    }, [characters, page, name]);

    return (
        <>
            <div className="relative pt-8 pb-6">
                <div className="relative">

                    <Combobox value={name}  >
                        <Combobox.Input
                            className="w-full px-4 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                            placeholder="Search for a character"
                            onChange={(value) => setName(value)}
                        />
                        {name.length > 0 && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-0 top-0 bg-gray-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded-l-full"
                            >
                                Delete
                            </button>
                        )}
                        <Combobox.Options className="absolute w-full py-2 mt-1 bg-gray-500 rounded-md shadow-lg z-10">
                            {render && error !== "Error" && characters.results !== undefined && characters.results.map((person: any) => (
                                <Combobox.Option
                                    key={person.id}
                                    value={person.name}
                                    className="px-4 py-2 text-white hover:bg-gray-400"
                                >
                                    {person.name}
                                </Combobox.Option>
                            ))} 
                        </Combobox.Options>
                    </Combobox>

                </div>
            </div>

        </>
    )
}

export default Search;
