import { useState } from 'react'
import './App.css'
import Autocomplete from './components/Autocomplete'
import { useQuery } from 'react-query';
import { Character, fetchCharacters } from './api/api';


function App() {
  const [value, setValue] = useState('');
 const { isLoading, error, data } = useQuery({queryKey: ['characters', value], queryFn: () => fetchCharacters(value)});

  const options = data?.results || [];
  const filteredOptions = options.filter(option => value && option.name.toLowerCase().includes(value.toLowerCase()));
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();
  return (<section className="block top-0">
    <div>
      <Autocomplete
       placeholder={'Search for Rick and Morty characters'}
       value={value}
       getLabel={(character) => character.name}
       onChange={setValue}
       options={filteredOptions}
       onSelect={(o) => setSelectedCharacter(o)} />
    </div>
    {selectedCharacter && <div className='my-40'>Selected character: {selectedCharacter.name} and he is {selectedCharacter.status}</div>}
  </section>
  )
}

export default App
