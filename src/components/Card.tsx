import React,{useState} from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";

import { Link } from 'react-router-dom';
interface Props {
  id: number,
  name: string;
  image: string;
  status: string;
}

const Card = ({id, name, image, status }: Props) => {
  const {  setID }: any = useFetchCharacters();
  const [isLiked, setIsLiked] =  useState(false);


  return ( 
    <div className="group relative bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
    <Link onClick={() => setID(id)} to={"detail"} className="block w-full h-full">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 lg:aspect-none">
        <img
          src={image}
          alt={name}
          className="object-cover object-center h-full w-full lg:h-full lg:w-full transition duration-300 group-hover:opacity-75"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{status}</p>
      </div>
    </Link>
  </div>
  );
};

export default Card;
