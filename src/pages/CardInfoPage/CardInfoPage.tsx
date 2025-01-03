import s from "./CardInfoPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import defaultImage from "../../assets/defaultImage.jpg";

export const CardInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { state: item } = location;
  const character = item;

  const informationList: { label: string; value: string | number }[] = [
    { label: "Actor", value: character.actor || "Unknown" },
    { label: "Gender", value: character.gender || "Unknown" },
    { label: "House", value: character.house || "Unknown" },
    { label: "Species", value: character.species || "Unknown" },
    { label: "Hair Colour", value: character.hairColour || "Unknown" },
    { label: "Eye Colour", value: character.eyeColour || "Unknown" },
    { label: "Date of Birth", value: character.dateOfBirth || "Unknown" },
    { label: "Year of Birth", value: character.yearOfBirth || "Unknown" },
  ];

  return (
    <>
      <section className={s.cardInfoPage}>
        <img className={s.cardInfoPage_img} src={item.image || defaultImage} />
        <h2 className={s.cardInfoPage_name}>{item.name}</h2>

        <span className={s.cardInfoPage_information}>Informations</span>
        <button
          className={s.cardGoBackBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          ← GoBack
        </button>

        <div className={s.cardInfoPage_wrap}>
          <div className={s.CardInfoPage_informations_list}>
            {informationList.map((info) => (
              <div key={info.label} className={s.cardInfo_text}>
                <h4>{info.label}</h4>
                <p>{info.value} </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
