import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: null,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "spinner/loading":
      return { ...state, isLoading: true };

    case "spinner/stoploading":
      return { ...state, isLoading: false };

    case "cities/data":
      return { ...state, cities: action.payload };

    case "create/city":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "delete/city":
      return {
        ...state,
        cities: state.cities.filter(
          (city) => action.payload !== city.id
        ),
      };

    case "city/data":
      return { ...state, currentCity: action.payload };

    case "error/handling":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};

function CitiesProvider({ children }) {
  const [
    { cities, isLoading, error, currentCity },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(error);

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "spinner/loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        console.log(res);

        if (!res.ok)
          throw new Error(
            "You're accessing wrong cities API url"
          );

        const data = await res.json();

        dispatch({ type: "cities/data", payload: data });
      } catch (e) {
        dispatch({
          type: "error/handling",
          payload: `😯 ${e.message}`,
        });
      } finally {
        dispatch({ type: "spinner/stoploading" });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function (id) {
    dispatch({ type: "spinner/loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok)
        throw new Error(
          "You're accessing wrong city API url"
        );

      const data = await res.json();

      dispatch({ type: "city/data", payload: data });
    } catch (e) {
      dispatch({
        type: "error/handling",
        payload: `😯 ${e.message}`,
      });
    } finally {
      dispatch({ type: "spinner/stoploading" });
    }
  }, []);

  const addCity = async function (cityObj) {
    dispatch({ type: "spinner/loading" });

    try {
      dispatch({ type: "error/handling", payload: "" });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(cityObj),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok)
        throw new Error(
          "You're accessing wrong city API url"
        );

      const data = await res.json();

      dispatch({ type: "create/city", payload: data });
    } catch (e) {
      dispatch({
        type: "error/handling",
        payload: `😯 ${e.message}`,
      });
    } finally {
      dispatch({ type: "spinner/stoploading" });
    }
  };

  const deleteCity = async function (id) {
    dispatch({ type: "spinner/loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok)
        throw new Error(
          "You're accessing wrong city API url"
        );

      dispatch({
        type: "delete/city",
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: "error/handling",
        payload: `😯 ${e.message}`,
      });
    } finally {
      dispatch({ type: "spinner/stoploading" });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        error,
        getCity,
        currentCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "The context is used outside the CitiesProvider"
    );
  return context;
}

export { CitiesProvider, useCitiesContext };
