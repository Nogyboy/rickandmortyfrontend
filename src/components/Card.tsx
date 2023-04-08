import React from "react";

interface Props {
  name: string;
  image: string;
  status: string;
}

const Card = ({ name, image, status }: Props) => {
  return (
    <div className="bg-gray-800 text-white overflow-hidden shadow rounded-lg border border-gray-500 border-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gradient-to-br from-sky-500 to-blue-800">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium">{name}</h3>
        <img
          src={image}
          alt={name}
          className="w-full h-auto rounded mt-4"
        />
        <p className="mt-2 max-w-2xl text-center">{status}</p>
      </div>
    </div>
  );
};

export default Card;
