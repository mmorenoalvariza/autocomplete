import { useState } from 'react'
import './App.css'
import Autocomplete from './components/Autocomplete'
import { useQuery } from 'react-query';
type Character = { id: number, name: string, status: 'Alive' | 'Dead' | 'unknown' };
const fetchCharacters = async (): Promise<{ results: Array<Character> }> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character`);
  return response.json();
}
function App() {
  const [value, setValue] = useState('');
  //const { isLoading, error, data } = useQuery('characters', () => fetch(`https://rickandmortyapi.com/api/character/?name=${value}`).then(res => res.json()), { enabled: true });
  const { isLoading, error, data } = useQuery('characters', fetchCharacters);

  const options = data?.results?.map((character) => ({ id: character.id, label: character.name, character })) || [];
  const filteredOptions = options.filter(option => value && option.label.toLowerCase().includes(value.toLowerCase()));
  const [selectedCharacter, setSelectedCharacter] = useState<typeof filteredOptions[number] | undefined>();
  return (<section className="block top-0">
    <div>
      <Autocomplete placeholder={'Search for Rick and Morty characters'} value={value} onChange={setValue} options={filteredOptions} onSelect={(o) => setSelectedCharacter(o)} />
    </div>
    {selectedCharacter && <div className='my-40'>Selected character: {selectedCharacter.character.name} and he is {selectedCharacter.character.status}</div>}
  </section>
  )
}

export default App
