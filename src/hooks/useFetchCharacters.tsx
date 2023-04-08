import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter, getCharactersSuccess, getCharactersFailure, setDataCharacterByName, setDataCharacterId } from "../slice/slice";
 

import { Character } from "../interfaces/types";
import { RootState } from "../actions/store";

import { getCharacters, getCharacterById, getCharactersByIds } from "../config/cliAxios";


const useFetchCharacters = () => {
  const dispatch = useDispatch();

  const { characters, loading, error, page, name, id } = useSelector(
    (state: RootState) => state.characters
  );
 


  const getAllCharacters = async () => {
    try {
      const data = await getCharacters(page, name);
      return data;
    }
    catch (error: any) {
      console.error(error);
    }

  };


  const setPage = (page: number) => {
    dispatch(getCharacter(page));
  };


  const setName = (name: string) => {

    dispatch(setDataCharacterByName(name));

  };

  const clearName = () => {
    dispatch(setDataCharacterByName(""));
    dispatch(getCharactersFailure(null))
  };

  const setID = (id: number) => { 
    dispatch(setDataCharacterId(id)); 
  };


  const getCharacterDetailByID = async () => {
    try {

      const data = await getCharacterById(id);
      return data;
    }
    catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(getCharacter(page));
        const data = await getCharacters(page, name); 
        if(data !== undefined){
                  dispatch(getCharactersSuccess(data)); 
        } else {
          dispatch(getCharactersFailure("Error"));
        }  
      } catch (error: any) {
        console.log("🚀 ~ file: useFetchCharacters.tsx:71 ~ error:", error)
        dispatch(getCharactersFailure(error));
      }
        
    })()
  }, [dispatch, page, name]); 

  return { characters, loading, error, getAllCharacters, setPage, page, setName, name, clearName, getCharacterDetailByID, setID, id };
}

export default useFetchCharacters
