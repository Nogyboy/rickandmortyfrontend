import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter, getCharactersSuccess, getCharactersFailure, setDataCharacterByName, setDataCharacterId } from "../slice/slice";
 

import { Character } from "../interfaces/types";
import { RootState } from "../actions/store";

import { getCharacters, getCharacterById, getCharactersByIds } from "../config/cliAxios";

interface FetchCharactersData {
  characters: Character[];
  loading: boolean;
  error: string | null;
  page: number;
  name: string;
  id: number;
  setPage: (page: number) => void;
  setName: (name: string) => void;
  clearName: () => void;
  getCharacterDetailByID: () => Promise<Character | undefined>;
  setID: (id: number) => void;
}
const useFetchCharacters = (): FetchCharactersData => {
  const dispatch = useDispatch();
  const { characters, loading, error, page, name, id } = useSelector(
    (state: RootState) => state.characters
  );

  const setPage = (page: number): void => {
    dispatch(getCharacter(page));
  };

  const setName = (name: string): void => {
    dispatch(setDataCharacterByName(name));
  };

  const clearName = (): void => {
    dispatch(setDataCharacterByName(""));
    dispatch(getCharactersFailure(null));
  };

  const setID = (id: number): void => {
    dispatch(setDataCharacterId(id));
  };

  const getCharacterDetailByID = async (): Promise<Character | undefined> => {
    try {
      const data = await getCharacterById(id);
      return data;
    } catch (error: any) {
      console.error(error);
    }
  };

  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);
  const memoizedPage = useMemo(() => page, [page]);
  const memoizedName = useMemo(() => name, [name]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        memoizedDispatch(getCharacter(memoizedPage));
        const data = await getCharacters(memoizedPage, memoizedName);
        console.log("🚀 ~ file: useFetchCharacters.tsx:65 ~ fetchData ~ data:", data)
        
        if (data !== undefined) {
          memoizedDispatch(getCharactersSuccess(data));
        } else {
          memoizedDispatch(getCharactersFailure("Error"));
          setName("");
        }
      } catch (error: any) {
        console.log("Error fetching characters:", error);
        memoizedDispatch(getCharactersFailure(error));
      }
    };

    fetchData();
  }, [memoizedDispatch, memoizedPage, memoizedName]);

  return { characters, loading, error , setPage, page, setName, name, clearName, getCharacterDetailByID, setID, id };
}

export default useFetchCharacters;
