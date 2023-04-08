import React, { useEffect, useState } from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";

import Header from "../components/Header";
import Card from "../components/Card";
import background from "../assets/background.svg";
import Spinner from "../components/Spinner";
import Search from "../components/Search";

const Home = () => {
    const { characters, error, setPage, page, name, clearName, setID, loading, setName, }: any = useFetchCharacters();
    const [render, setRender] = useState(false);
    const [pageTotal, setPageTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any>([]);
 
    
    useEffect(() => {

        setRender(false)
        if (characters !== undefined && characters && characters.results && characters.results.length > 0 && error === null) {
            setRender(true);
            setPageTotal(characters.info.pages);

        } else {
            setRender(false);
        }
    }, [characters, page, name]);


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


    return (
        <>
            <Header />
            <div style={{ backgroundImage: `url(${background})` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                    <Search />

                    <div className="pt-2 pb-10 container ">

                        {
                            (render)
                                ?
                                (<>
                                    <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {characters?.results?.map((character: any) => (
                                            <Card key={character.id} id={character.id} name={character.name} image={character.image} status={character.status} />
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
