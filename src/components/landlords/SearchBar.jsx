import { SearchInput } from "../common";

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <SearchInput
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search landlords by name, phone or email..."
    />
  );
}