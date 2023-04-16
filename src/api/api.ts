export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
};

export const fetchCharacters = async (
  search: string
): Promise<{ results: Array<Character> }> => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character/?name=" + search
  );
  return response.json();
};
