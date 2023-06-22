import { useState } from "react";

export const TextFilterDialog = ({
  filterEnable,
  clearFilter,
  setFilter,
}: {
  filterEnable: boolean;
  clearFilter: () => void;
  setFilter: (val: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    setFilter(inputValue);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button disabled={!inputValue} type="submit">
        search
      </button>
      <button disabled={!filterEnable} onClick={clearFilter}>
        clear
      </button>
    </form>
  );
};
