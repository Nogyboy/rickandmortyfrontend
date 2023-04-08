import React, { useEffect, useState } from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";
import { Combobox } from '@headlessui/react'

import Header from "../components/Header";
import Card from "../components/Card";
import background from "../assets/background.svg";
import Spinner from "../components/Spinner";

const people = [
    '-------------',
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]


const Home = () => {
    const { characters, loading, error, setPage, page  }: any = useFetchCharacters();
    const [render, setRender] = useState(false);
    const [pageTotal, setPageTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any>([]);
    console.log("🚀 ~ file: Home.tsx:22 ~ Home ~ page:", page)
    console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ error:", error)
    console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ loading:", loading)
    console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ characters:", characters) 
    console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ pageTotal:", pageTotal)
     
    useEffect(() => {
        setRender(false)
        if (characters && characters.results && characters.results.length > 0) {
            setRender(true);
            setPageTotal(characters.info.pages);

        } else {
            setRender(false);
        }
    }, [characters, page]);

    
    console.log("🚀 ~ file: Home.tsx:14 ~ useEffect ~ render", render)

    const handlePrevPage = () => {
        setCurrentPage((prev) => prev - 1);
        setPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
        setPage(currentPage + 1);
    };


    const [selectedPerson, setSelectedPerson] = useState(null)
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })


    return (
        <>
            <Header />
            <div style={{ backgroundImage: `url(${background})` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative pt-8 pb-6">
                        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                            <Combobox.Input
                                className="w-full px-4 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Buscar"
                            />
                            <Combobox.Options className="absolute w-full py-2 mt-1 bg-gray-500 rounded-md shadow-lg z-10">
                                {filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person}
                                        value={person}
                                        className="px-4 py-2 text-white hover:bg-gray-400"
                                    >
                                        {person}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Combobox>
                    </div>


                    <div className="pt-2 pb-10 container ">

                        {
                            (render)
                                ?
                                (<>
                                    <div className="  ">
                                        <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {characters.results.map((character: any) => (
                                                <Card key={character.id} name={character.name} image={character.image} status={character.status} />
                                            ))}
                                        </div>
                                        <div className="flex justify-center mt-6">
                                            <button
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                                className={`bg-gray-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-l-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                Anterior
                                            </button>
                                            <div className="flex items-center justify-center h-12 px-4 text-white text-lg mx-4 bg-slate-600">
                                                Página {currentPage} de {pageTotal}
                                            </div>
                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage === pageTotal}
                                                className={`bg-gray-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r-full ${currentPage === pageTotal ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                Siguiente
                                            </button>
                                        </div>
                                    </div>

                                </>
                                )
                                :
                                (<Spinner />)
                        }
                    </div>
                </div>

            </div>

        </>
    );
};

export default Home;
