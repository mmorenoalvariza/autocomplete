import { FunctionComponent } from "react";
type Option = { id: string | number; label: string };
type Props<T> = {
    placeholder?: string;
    value: string;
    onChange: (newValue: string) => void;
    options: Array<T>;
    onSelect: (selectedOption: T) => void;
}

const Autocomplete = <T extends Option,>(props: Props<T>) => {
    const { placeholder = '', value, onChange, options = [], onSelect } = props;

    return <div className="flex flex-col -50"><input type='text' className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border' placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        <Options options={options} value={value} onSelect={onSelect} /></div>
}

const Options = <T extends Option,>({ options, value, onSelect }: Pick<Props<T>, 'options' | 'value' | 'onSelect'>) => {
    return <ul className="border flex flex-col justify-start">
        {options.map(option => <li key={option.id} onClick={() => onSelect(option)}><HighlightLabel label={option.label} value={value} /></li>)}
    </ul>
}

const HighlightLabel: FunctionComponent<{ label: string; value: string }> = ({ label, value }) => {
    const parts = label.split(new RegExp(`(${value})`, 'gi'));
    return <span> {parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === value.toLowerCase() ? { fontWeight: 'bold' } : {}}>
            {part}
        </span>)
    } </span>;
}

export default Autocomplete;
