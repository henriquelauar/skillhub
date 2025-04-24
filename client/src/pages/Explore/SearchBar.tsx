import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4">
      <h5 className="text-xl fw-semibold mb-3">Buscar por nome ou habilidade</h5>
      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Busque por nome ou habilidade..."
          value={value}
          onChange={onChange}
        />
        <button onClick={onSearch} className="btn btn-outline-secondary d-flex align-items-center gap-1">
          <FaSearch />
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
