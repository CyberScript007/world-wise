import { useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import ButtonBack from "./ButtonBack";
import useSearchParameter from "../hooks/useSearchParameter";
import Spinner from "../component/Spinner";
import Message from "../component/Message";
import styles from "../component/Form.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function getFlagEmojis(code) {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  isLoadingCity: false,
  cityName: "",
  visitedDate: new Date(),
  note: "",
  cityDetails: null,
  errorMessage: "",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "spinner/loading":
      return { ...state, isLoadingCity: true };

    case "spinner/stopLoading":
      return { ...state, isLoadingCity: false };

    case "city/loaded":
      return { ...state, cityDetails: action.payload };

    case "city/name":
      return {
        ...state,
        cityName: action.payload,
      };

    case "visited/date":
      return { ...state, visitedDate: action.payload };

    case "user/note":
      return { ...state, note: action.payload };

    case "error/message":
      return { ...state, errorMessage: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [
    { cityName, visitedDate, note, isLoadingCity, cityDetails, errorMessage },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [lat, lng] = useSearchParameter();
  const { addCity } = useCitiesContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getCityData() {
        dispatch({ type: "spinner/loading" });

        try {
          dispatch({ type: "error/message", payload: "" });

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();

          if (!data.countryName)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 🤗"
            );

          dispatch({ type: "city/loaded", payload: data });
        } catch (e) {
          dispatch({ type: "error/message", payload: e.message });
        } finally {
          dispatch({ type: "spinner/stopLoading" });
        }
      }
      getCityData();
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (!cityDetails) return;

      dispatch({ type: "city/name", payload: cityDetails.city });
    },
    [cityDetails]
  );

  if (isLoadingCity) return <Spinner />;

  if (errorMessage) return <Message message={errorMessage} />;

  if (!cityDetails) return;

  const { countryCode, city, countryName, latitude, longitude } = cityDetails;

  console.log(cityName);
  return (
    <form className={styles.form}>
      <div className={styles.form_control}>
        <label htmlFor="city">City name</label>
        <div>
          <input
            type="text"
            id="city"
            value={cityName}
            onChange={(e) =>
              dispatch({
                type: "city/name",
                payload: e.target.value,
              })
            }
          />
          <span>{getFlagEmojis(countryCode)}</span>
        </div>
      </div>
      <div className={styles.form_control}>
        <label htmlFor="place">
          When did you go to <strong>{cityName}?</strong>
        </label>
        <DatePicker
          selected={visitedDate}
          onChange={(date) => dispatch({ type: "visited/date", payload: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className={styles.form_control}>
        <label htmlFor="note">
          Notes about your trip to <strong>{cityName}</strong>
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) =>
            dispatch({ type: "user/note", payload: e.target.value })
          }
        ></textarea>
      </div>
      <div className={styles.btn_container}>
        <Button
          type="success"
          onClick={(e) => {
            e.preventDefault();
            addCity({
              cityName: city,
              country: countryName,
              emoji: countryCode,
              date: visitedDate,
              notes: note,
              position: {
                lat: latitude,
                lng: longitude,
              },
            });
            navigate("/app/cities");
          }}
        >
          add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
