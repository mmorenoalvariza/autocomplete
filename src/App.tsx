import { createContext, useState } from "react";
import "./App.css";
import Autocomplete from "./components/Autocomplete";
import { useQuery } from "react-query";
import { Character, fetchCharacters } from "./api/api";

export const ThemeContext = createContext("light");
function App() {
  const [value, setValue] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["characters", value],
    queryFn: () => fetchCharacters(value),
  });

  const options = (value && data?.results) || [];

  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | undefined
  >();

  const [values, setValues] = useState(0);
  const updateS = () => {
    setValues(values + 1);
  };
  return (
    <ThemeContext.Provider value={"light"}>
      <div>{values}</div>
      <section className="block top-0">
        <div>
          <Autocomplete
            placeholder={"Search for Rick and Morty characters"}
            value={value}
            getLabel={(character) => character.name}
            onChange={setValue}
            options={options}
            onSelect={(o) => {
              setValue(o.name);
              setSelectedCharacter(o);
            }}
          />
        </div>
        {selectedCharacter && (
          <div className="my-40">
            Selected character: {selectedCharacter.name} and he is{" "}
            {selectedCharacter.status}
          </div>
        )}
      </section>
      <button onClick={() => updateS()}> Click</button>
    </ThemeContext.Provider>
  );
}

export default App;
