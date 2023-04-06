import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from "../App";
import Autocomplete from '../components/Autocomplete';
import { vi } from 'vitest';
import { M } from 'vite-node/types-e6d31da0';


describe('Autocomplete', () => {
  it('Renders the autocomplete correctly', () => {
    const options = [
      {id: 1, label: 'Foo'},
      {id: 2, label: 'Bar'},
      {id: 3, label: 'Baz'},
    ];
    const onChange = vi.fn();
    const onSelect = vi.fn();

    render(<Autocomplete options={options} value='Foo' getLabel={(o) => o.label} 
    onChange={onChange}
    onSelect={onSelect} />);
    
    expect(screen.getByDisplayValue('Foo')).toBeVisible();
    expect(screen.getByText('Foo')).toBeVisible();
    expect(screen.getByText('Baz')).toBeVisible();
    expect(screen.getByText('Baz')).toBeVisible();
    // TODO: Figure mocks out
    /*userEvent.type(screen.getByDisplayValue('Foo'), 'BarBaz')
    expect(onChange).toHaveBeenCalledWith('BarBaz');
    userEvent.click(screen.getByText('Baz'));
    expect(onSelect).toHaveBeenCalledWith({});*/
  });
});