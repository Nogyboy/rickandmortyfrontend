import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter, getCharactersSuccess, getCharactersFailure } from "../slice/slice";
import { Character } from "../interfaces/types";
import { RootState } from "../actions/store";

import { getCharacters, getCharacterById, getCharactersByIds } from "../config/cliAxios";


const useFetchCharacters = () => {
  const dispatch = useDispatch();
 
  const { characters, loading, error, page } = useSelector(
    (state: RootState) => state.characters
  );
 

  const getAllCharacters = async () => {
    try {
      const data = await getCharacters(page);
      console.log("🚀 ~ file: useFetchCharacters.tsx:19 ~ getAllCharacters ~ data:", data)
      return data;
    }
    catch (error: any) {
      console.error(error);
    }
     
  };


    const setPage = (page: number) => { 
      dispatch(getCharacter(page));
    };

    
    useEffect(() => {
      
      (async() => {  
          try { 
            dispatch(getCharacter(page)); 
            const data = await getCharacters(page); 
            dispatch(getCharactersSuccess(data)); 
          } catch (error: any) {
            dispatch(getCharactersFailure(error.message));
          } 
      })() 
    }, [dispatch, page]);

    return { characters, loading, error, getAllCharacters, setPage,page,  };
  } 

export default useFetchCharacters
