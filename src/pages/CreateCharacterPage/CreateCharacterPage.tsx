import { useForm } from "react-hook-form";
import { addCharacter } from "../../features/charactersSlice";
import s from "./CreateCharacterPage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Character } from "../../features/charactersSlice";

export const CreateCharacterPage = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Character>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: Character) => {
    dispatch(addCharacter(data));
    console.log(data);

    reset();
    alert("Персонаж создан!");
  };

  return (
    <div className={s.wrapp}>
      <h1 className={s.title}>Create New Character</h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formItem}>
          <label htmlFor="name">Name</label>
          <input
            className={s.input}
            // 2. Валидация на обязательное поле
            {...register("name", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Имя должно содержать минимум 2 символа",
              },
            })}
          />
          {/* 3. Сообщение об ошибке */}
          {errors.name && <p className={s.error}>{errors.name.message}</p>}
        </div>

        <div className={s.formItem}>
          <label htmlFor="actor">Actor</label>
          <input
            className={s.input}
            {...register("actor", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Имя актёра не может быть короче 2 символов",
              },
            })}
          />
          {errors.actor && <p className={s.error}>{errors.actor.message}</p>}
        </div>

        <div className={s.formItem}>
          <label htmlFor="gender">Gender</label>
          <select
            className={s.input}
            {...register("gender", {
              required: "Поле обязательно для заполнения",
            })}
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className={s.error}>{errors.gender.message}</p>}
        </div>

        <div className={s.formItem}>
          <label htmlFor="house">House</label>
          <select
            className={s.input}
            {...register("house", {
              required: "Поле обязательно для заполнения",
            })}
          >
            <option value="">Select a house</option>

            <option value="Gryffindor">Gryffindor</option>
            <option value="Slytherin">Slytherin</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
          </select>

          {errors.house && <p className={s.error}>{errors.house.message}</p>}
        </div>

        <div className={s.formItem}>
          <label htmlFor="wand.core">Wand Core</label>
          <input
            className={s.input}
            {...register("wand.core", {
              required: "Поле обязательно для заполнения",
            })}
          />
          {errors.wand?.core && (
            <p className={s.error}>{errors.wand.core.message}</p>
          )}
        </div>

        <div className={s.formItem}>
          <label htmlFor="alive">Alive?</label>
          <input type="checkbox" className={s.input} {...register("alive")} />
        </div>

        <div className={s.wrappBtns}>
          <button
            type="button"
            className={s.backBtn}
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <button type="submit" className={s.createCharacterBtn}>
            Create Character
          </button>
        </div>
      </form>
    </div>
  );
};
