import React from "react";
import { Sidebar } from "./UI";
import StatsPanel from "./StatsPanel";
import FiltersPanel from "./FiltersPanel";
import type { Song } from "../store/songSlice";

interface Filters {
  title: string;
  artist: string;
  genre: string;
}

interface AppSidebarProps {
  songs: Song[];
  filteredSongs: Song[];
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
  onClearFilters: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  songs,
  filteredSongs,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <Sidebar>
      <FiltersPanel
        songs={songs}
        filteredSongs={filteredSongs}
        filters={filters}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
      />
      <StatsPanel />
    </Sidebar>
  );
};

export default AppSidebar;
