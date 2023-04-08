import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api/';

const client = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getCharacters = async (page: number, name: string) => {
  try {
    const response = await client.get(`/character/?page=${page}&name=${name}`);
    return response.data;
  } catch (error) { 
    console.error(error);
    return error
  }
};

const getCharacterById = async (id: number) => {
  try {
    const response = await client.get(`character/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getCharactersByIds = async (ids: number[]) => {
  try {
    const response = await client.get(`character/${ids}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export { getCharacters, getCharacterById, getCharactersByIds }