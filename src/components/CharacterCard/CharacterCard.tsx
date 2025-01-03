import s from "./CharacterCard.module.css";
import React from "react";
import likeFull from "../../assets/icons/like-full.svg";
import likeEmpty from "../../assets/icons/like-empty.svg";
import { useDispatch } from "react-redux";
import { removeCharacter } from "../../features/charactersSlice";

interface CharacterCardProps {
  id: number;
  image: string;
  name: string;
  actor: string;
  gender: string;
  house: string;
  wandCore: string;
  alive: string;
  toggleFavorite: () => void;
  isFavorite: boolean;
  onClick?: () => void;
}

export const CharacterCard = ({
  id,
  image,
  name,
  actor,
  gender,
  house,
  wandCore,
  alive,
  toggleFavorite,
  isFavorite,
  onClick,
}: CharacterCardProps) => {
  const dispatch = useDispatch();
  const likeIcon = isFavorite ? likeFull : likeEmpty;

  // Обработчик удаления персонажа
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Предотвращаем всплытие события клика
    dispatch(removeCharacter(id));
  };

  // Обработчик переключения избранного
  const handleToggleFavorite = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation(); // Предотвращаем всплытие события клика
    toggleFavorite();
  };

  // Обработчик клика по карточке
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <article className={s.card} onClick={handleCardClick}>
      <button className={s.card__btnRemove} onClick={handleRemove}>
        &times;
      </button>

      <img
        onClick={handleToggleFavorite}
        className={s.card__btnLike}
        src={likeIcon}
        alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
      />

      {/* Блок с изображением*/}
      <div className={s.card__img}>
        <img src={image} alt={name} />
      </div>

      {/* Блок с информацией */}
      <div className={s.card__info}>
        <div className={s.card__content}>
          <h2>{name}</h2>
          <p>
            Actor: <span>{actor || "Unknown"}</span>
          </p>
          <p>
            Gender: <span>{gender || "Unknown"}</span>
          </p>
          <p>
            House: <span>{house || "Unknown"}</span>
          </p>
          <p>
            Wand core: <span>{wandCore || "Unknown"}</span>
          </p>
          <p>
            Alive: <span>{alive || "Unknown"}</span>
          </p>
        </div>
      </div>
    </article>
  );
};
