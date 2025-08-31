import React from "react";
import type { Song } from "../store/songSlice";
import styled from "@emotion/styled";

const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M7 12H17M9 18H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ResultsCount = styled.div`
  font-size: 14px;
  color: #b0b0b0;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #b0b0b0;
`;

const FilterInput = styled.input`
  width: 90%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6e45e2;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6e45e2;
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
  }
`;

const ClearFiltersButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${(props) =>
    props.disabled ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)"};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: ${(props) =>
    props.disabled ? "rgba(255, 255, 255, 0.3)" : "#ffffff"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(255, 255, 255, 0.15)"};
  }
`;

interface Filters {
  title: string;
  artist: string;
  genre: string;
}

interface FiltersPanelProps {
  songs: Song[];
  filteredSongs: Song[];
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
  onClearFilters: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  songs,
  filteredSongs,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = filters.title || filters.artist || filters.genre;

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          <FilterIcon />
          Filters
        </PanelTitle>
      </PanelHeader>

      <ResultsCount>
        Showing {filteredSongs.length} of {songs.length} songs
      </ResultsCount>

      <FilterGroup>
        <FilterLabel>Search by Title</FilterLabel>
        <FilterInput
          type="text"
          placeholder="Enter song title..."
          value={filters.title}
          onChange={(e) => onFilterChange("title", e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Filter by Artist</FilterLabel>
        <FilterSelect
          value={filters.artist}
          onChange={(e) => onFilterChange("artist", e.target.value)}
        >
          <option value="">All Artists ({songs.length})</option>
          {Array.from(new Set(songs.map((song) => song.artist)))
            .sort()
            .map((artist) => {
              const count = songs.filter(
                (song) => song.artist === artist
              ).length;
              return (
                <option key={artist} value={artist}>
                  {artist} ({count})
                </option>
              );
            })}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Filter by Genre</FilterLabel>
        <FilterSelect
          value={filters.genre}
          onChange={(e) => onFilterChange("genre", e.target.value)}
        >
          <option value="">All Genres ({songs.length})</option>
          {Array.from(new Set(songs.map((song) => song.genre)))
            .sort()
            .map((genre) => {
              const count = songs.filter((song) => song.genre === genre).length;
              return (
                <option key={genre} value={genre}>
                  {genre} ({count})
                </option>
              );
            })}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear All Filters
        </ClearFiltersButton>
      </FilterGroup>
    </Panel>
  );
};

export default FiltersPanel;
