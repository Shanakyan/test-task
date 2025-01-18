import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultImage from "../assets/defaultImage.jpg";

const BASE_URL = "https://hp-api.onrender.com/api/characters";
const initialState = {
  charactersState: [] as Character[],
  favoritesState: [] as Character[],
  isLoading: false,
  //isError: false,
};

export interface Character {
  id: number;
  image: string;
  actor: string;
  gender: string;
  house: string;
  wandCore: string;
  alive: boolean;
  name: string;
  species: string;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wizard: boolean;
  yearOfBirth: number;
}

/* Создаём асинхронную функция для запроса к /api/characters */
export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  }
);
/* 3. Создаём слайс (срез логики (то есть состояние и функций) связанных с персонажами и их получением) */
const charactersSlice = createSlice({
  name: "characters",
  initialState,
  /* reducers - для работы с синхронным кодом */
  reducers: {
    removeCharacter: (state, action) => {
      console.log(state);
      console.log(action);
      state.charactersState = state.charactersState.filter(
        (character: Character) => character.id !== action.payload // id персонажа, которого нужно удалить
      );
      state.favoritesState = state.favoritesState.filter(
        (character: Character) => character.id !== action.payload // id персонажа, которого нужно удалить
      );
    },
    addCharacter: (state, action) => {
      state.charactersState.unshift({
        ...action.payload,
        id: Date.now(),
        image: defaultImage,
      });
    },
    toggleFavorite: (state, action) => {
      console.log(action.payload);
      const isFavorite = state.favoritesState.some(
        (character: Character) => character.id === action.payload.id
      );

      console.log(isFavorite);

      if (isFavorite) {
        state.favoritesState = state.favoritesState.filter(
          (character: Character) => character.id !== action.payload.id
        );
      } else {
        state.favoritesState.push(action.payload);
      }
    },
  },

  /* extraReducers - для работы с асинхронкой */
  extraReducers: (builder) => {
    /* Настроили обработку успешного запроса к серверу по /api/characters */
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.charactersState = action.payload;

      state.isLoading = false;
    });
    /* Настроили обработку неуспешного запроса к серверу по /api/characters */
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.charactersState = [];
      state.isLoading = false;
    });
    /* Настроили обработку pending по /api/characters */
    builder.addCase(fetchCharacters.pending, (state) => {
      state.charactersState = [];
      state.isLoading = true;
    });
  },
});
export default charactersSlice.reducer;
export const { removeCharacter, toggleFavorite, addCharacter } =
  charactersSlice.actions;
