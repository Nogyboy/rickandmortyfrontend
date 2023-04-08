
import React, { useEffect, useState } from 'react'
import useFetchCharacters from "../hooks/useFetchCharacters";
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import Spinner from '../components/Spinner';
import circuitBoard from '../assets/circuitBoard.svg';

const Detail = () => {
  const [render, setRender] = useState(false);
  const [data, setData] = useState<any>([])

  const { id, getCharacterDetailByID }: any = useFetchCharacters();

  useEffect(() => {
    (async () => {
      setRender(false)
      const data = await getCharacterDetailByID();
      setData(data)
      setRender(true)
    })();
  }, [])
  return (
    <div style={{ backgroundImage: `url(${circuitBoard})` }}> 
    <div className="flex flex-col items-center justify-center py-8  " >
      {render ? (
      <div className="w-full max-w-6xl px-4 ">
        <div className="flex items-center justify-between mb-4 backdrop-blur-sm bg-white/30 p-5">
          <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 hover:text-gray-600">
            View on API
          </a>
        </div>
        <div className="flex flex-col lg:flex-row backdrop-blur-sm bg-white/30">
          <div className="flex flex-col w-full lg:w-1/2 mb-4 lg:mb-0 p-10">
            <img src={data.image} alt={data.name} className="w-full h-auto rounded-lg shadow-lg mb-4 lg:mb-0" />
          </div>
          <div className="flex flex-col w-full lg:w-1/2 lg:pl-6 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Status</h2>
            <p className="text-base text-gray-700 mb-4">{data.status}</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Species</h2>
            <p className="text-base text-gray-700 mb-4">{data.species}</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Type</h2>
            <p className="text-base text-gray-700 mb-4">{data.type}</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Gender</h2>
            <p className="text-base text-gray-700 mb-4">{data.gender}</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Origin</h2>
            <p className="text-base text-gray-700 mb-4">
              <a href={data.origin.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {data.origin.name}
              </a>
            </p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Location</h2>
            <p className="text-base text-gray-700 mb-4">
              <a href={data.location.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {data.location.name}
              </a>
            </p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Episodes</h2>
            <ul className="list-disc list-inside text-base text-gray-700 mb-4">
              {data.episode.map((episode: string) => (
                <li key={episode}>
                  <a href={episode} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {episode}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Created</h2>
            <p className="text-base text-gray-700 mb-4">{data.created}</p>
          </div>
        </div>
      </div>
      )
       : <Spinner />}
    </div>
    </div>
  );
  
  
}

export default Detail