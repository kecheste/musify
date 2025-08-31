import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { fetchSongs, deleteSong } from "./store/actions/songActions.ts";
import { fetchStats } from "./store/actions/statsActions.ts";
import type { Song } from "./store/songSlice.ts";

// Components
import CreateModal from "./components/CreateModal.tsx";
import EditModal from "./components/EditModal.tsx";
import AppHeader from "./components/AppHeader.tsx";
import AppSidebar from "./components/AppSidebar.tsx";
import SongList from "./components/SongList.tsx";
import {
  Container,
  MainContent,
  ContentGrid,
  MobilePanelToggle,
  RefreshButton,
  ErrorContainer,
  LoadingContainer,
  CloseIcon,
  FilterIcon,
} from "./components/UI.tsx";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [filters, setFilters] = useState({
    title: "",
    artist: "",
    genre: "",
  });
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { songs, loading, error, operation } = useSelector(
    (state: RootState) => state.songs
  );
  // Stats are now handled within StatsPanel component, but we still need to fetch them
  useSelector((state: RootState) => state.stats);

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchStats());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSong(id));
    }
  };

  const handleEdit = (id: string) => {
    const songToEdit = songs.find((song) => song._id === id);
    if (songToEdit) {
      setEditingSong(songToEdit);
      setEditModal(true);
    }
  };

  // Filter songs based on current filters
  const filteredSongs = songs.filter((song) => {
    const titleMatch = song.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const artistMatch = !filters.artist || song.artist === filters.artist;
    const genreMatch = !filters.genre || song.genre === filters.genre;
    return titleMatch && artistMatch && genreMatch;
  });

  const handleFilterChange = (
    filterType: "title" | "artist" | "genre",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      title: "",
      artist: "",
      genre: "",
    });
  };

  // Error UI with refresh button
  if (error) {
    return (
      <Container>
        <AppHeader onAddSong={() => setOpenModal(true)} />
        <ErrorContainer>
          <div>Error: {error}</div>
          <RefreshButton
            onClick={() => {
              dispatch(fetchSongs());
              dispatch(fetchStats());
            }}
          >
            Refresh
          </RefreshButton>
        </ErrorContainer>
      </Container>
    );
  }

  if (loading && operation === "fetch") {
    return (
      <Container>
        <AppHeader onAddSong={() => setOpenModal(true)} />
        <LoadingContainer>Loading songs...</LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      {openModal && <CreateModal onClose={() => setOpenModal(false)} />}
      {editModal && editingSong && (
        <EditModal
          song={editingSong}
          onClose={() => {
            setEditModal(false);
            setEditingSong(null);
          }}
        />
      )}

      <AppHeader onAddSong={() => setOpenModal(true)} />

      <MainContent>
        <MobilePanelToggle onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <CloseIcon /> : <FilterIcon />}
          {showSidebar ? "Hide Filters" : "Show Filters & Stats"}
        </MobilePanelToggle>

        <ContentGrid>
          {(showSidebar || window.innerWidth > 1024) && (
            <AppSidebar
              songs={songs}
              filteredSongs={filteredSongs}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearAllFilters}
            />
          )}

          <SongList
            songs={songs}
            filteredSongs={filteredSongs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={() => setOpenModal(true)}
          />
        </ContentGrid>
      </MainContent>
    </Container>
  );
}

export default App;
