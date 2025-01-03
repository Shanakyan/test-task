import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Character,
  fetchCharacters,
  toggleFavorite,
} from "../../features/charactersSlice";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { AppDispatch, RootState } from "../../store/store";
import s from "./HomePage.module.css"; // Предполагается, что есть CSS модуль для стилизации
import { Spinner } from "../../components/Spinner/Spinner";
import defaultImage from "../../assets/defaultImage.jpg";

const ITEMS_PER_PAGE = 10; // Количество элементов на одной странице

function HomePage() {
  /* Тип списка карточек */
  const [charactersListType, setCharactersListType] = useState<
    "All" | "Favorites"
  >("All");

  /* Состояние текущей страницы */
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector((state: RootState) => state.isLoading);
  const characters = useSelector((state: RootState) => state.charactersState); // Персонажи из стора
  const favorites = useSelector((state: RootState) => state.favoritesState); // Избранное из стора

  /* Выбор списка персонажей в зависимости от типа фильтра */
  const charactersList = charactersListType === "All" ? characters : favorites;

  useEffect(() => {
    // Если список персонажей пуст, то загружаем их
    if (characters.length === 0) {
      dispatch(fetchCharacters());
    }
  }, [characters.length, dispatch]);

  /* Вычисляем общее количество страниц */
  const totalPages = useMemo(() => {
    return Math.ceil(charactersList.length / ITEMS_PER_PAGE);
  }, [charactersList.length]);

  /* Получаем список персонажей для текущей страницы */
  const currentCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return charactersList.slice(startIndex, endIndex);
  }, [charactersList, currentPage]);

  /* Обработчик изменения фильтра */
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCharactersListType(e.target.value as "All" | "Favorites");
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтра
  };

  /* Обработчик перехода на предыдущую страницу */
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  /* Обработчик перехода на следующую страницу */
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  /* Обработчик перехода на конкретную страницу */
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  /* Генерация массива номеров страниц */
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <>
      <div className={s.filterBlock}>
        <select
          className={s.select}
          value={charactersListType}
          onChange={handleFilterChange}
        >
          <option value="All">All Characters</option>
          <option value="Favorites">Show Favorite Characters</option>
        </select>

        {/* Кнопка для перехода на страницу создания нового персонажа */}
        <button
          className={s.createBtn}
          type="button"
          onClick={() => navigate("/createCharacter")}
        >
          Create New Characters
        </button>
      </div>

      <div className={s.cards__wrapper}>
        {currentCharacters.length === 0 &&
          charactersListType === "Favorites" && (
            <div className={s.noFavorites}>
              <p>В избранном ничего нет 🤷‍♀️</p>
            </div>
          )}

        {isLoading && <Spinner />}

        {currentCharacters.map((character: Character) => {
          // Проверяем, является ли персонаж любимым
          const isFavorite = favorites.some(
            (favorite: Character) => favorite.id === character.id
          );

          return (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              actor={character.actor}
              alive={character.alive ? "Yes" : "No"}
              gender={character.gender}
              house={character.house}
              image={character.image || defaultImage}
              wandCore={character.wand.core}
              toggleFavorite={() => dispatch(toggleFavorite(character))}
              isFavorite={isFavorite}
              onClick={() =>
                navigate(`/cardInfoPage/${character.id}`, {
                  state: character,
                })
              }
            />
          );
        })}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className={s.pagination}>
          <button
            className={s.pagination__btn}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &laquo; Назад
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`${s.pagination__btn} ${
                currentPage === number ? s.active : ""
              }`}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          ))}

          <button
            className={s.pagination__btn}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Вперед &raquo;
          </button>
        </div>
      )}
    </>
  );
}

export default HomePage;
