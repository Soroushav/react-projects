import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/created":
      return {...state, isLoading: false, cities: [...state.cities, action.payload]}
    case "cities/deleted":
      return {...state, isLoading: false, cities: state.cities.filter(city => city.id != action.payload)}
    case "setCurrentCity":
      return{...state, isLoading: false, currentCity: action.payload}
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("an unexpected error happened!");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, cities, currentCity, error } = state;
  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({type: "rejected", payload: "an error happened fetching data!"})
      }
    }
    getCities();
  }, []);

  async function getCurrentCity(id) {
    dispatch({type: "loading"})
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: "setCurrentCity", payload: data})
    } catch {
      dispatch({type: "rejected", payload: "an error happened fetching data!"})
    }
  }
  async function createCity(newCity) {
    dispatch({type: "loading"})
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type: "cities/created", payload: data});
    } catch {
      dispatch({type: "rejected", payload: "an error happened fetching data!"})
    }
  }

  async function deleteCity(cityId) {
    dispatch({type: "loading"})
    try {
      const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      dispatch({type: "cities/delete", payload: cityId})
    } catch {
      dispatch({type: "rejected", payload: "an error happened fetching data!"})
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCurrentCity,
        isLoading,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  return useContext(CitiesContext);
}
export { CitiesProvider, useCities };
