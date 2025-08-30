import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import styled from "@emotion/styled";
import { fetchSongs, deleteSong } from "./store/actions/songActions.ts";
import { fetchStats } from "./store/actions/statsActions.ts";
import type { Song } from "./store/songSlice.ts";

// Components
import CreateModal from "./components/CreateModal.tsx";
import EditModal from "./components/EditModal.tsx";

// Icons
const MusicNoteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3V14.554C11.3744 14.1991 10.6351 14 9.84615 14C7.67948 14 6 15.7909 6 18C6 20.2091 7.67948 22 9.84615 22C11.2734 22 12.5033 21.2455 13.1538 20.127V9.44701C13.7795 9.80188 14.5188 10 15.3077 10C17.4744 10 19.1538 8.20914 19.1538 6C19.1538 3.79086 17.4744 2 15.3077 2C14.5139 2 13.7852 2.19334 13.1538 2.535V3H12Z" />
  </svg>
);

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

const StatsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 17L17 7M7 7H17V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Styled components
const Container = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #e0e0e0;
`;

const Header = styled.header`
  width: 100%;
  padding: 0;
  margin: 0;
  background: rgba(13, 11, 34, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 16px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 24px 40px;

  @media (max-width: 1024px) {
    padding: 90px 20px 30px;
  }

  @media (max-width: 768px) {
    padding: 90px 16px 30px;
    grid-template-columns: 1fr;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;

    & > * {
      min-width: 280px;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

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

const SongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SongCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SongTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
    border-radius: 50%;
  }
`;

const SongMeta = styled.div`
  font-size: 14px;
  color: #b0b0b0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetaLabel = styled.span`
  font-weight: 500;
  color: #88d3ce;
  min-width: 60px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  justify-content: flex-end;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(110, 69, 226, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #e0e0e0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const DangerButton = styled.button`
  background: transparent;
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    transform: translateY(-2px);
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  font-weight: 500;
  color: #b0b0b0;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: #ffffff;
  font-size: 18px;
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
  width: 100%;
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

const ClearFiltersButton = styled.button`
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

const RefreshButton = styled.button`
  margin-top: 18px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(110, 69, 226, 0.4);
  }
`;

const MobilePanelToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    display: flex;
  }
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
  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useSelector((state: RootState) => state.stats);

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

  // Error UI with refresh
  if (error) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Logo href="/">
              <MusicNoteIcon />
              Musify
            </Logo>
          </HeaderContent>
        </Header>
        <div
          style={{
            paddingTop: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#ff6b6b",
            fontSize: "1.2rem",
          }}
        >
          <div>Error: {error}</div>
          <RefreshButton
            onClick={() => {
              dispatch(fetchSongs());
              dispatch(fetchStats());
            }}
          >
            Refresh
          </RefreshButton>
        </div>
      </Container>
    );
  }

  if (loading && operation === "fetch") {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Logo href="/">
              <MusicNoteIcon />
              Musify
            </Logo>
          </HeaderContent>
        </Header>
        <div
          style={{
            paddingTop: 140,
            display: "flex",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "1.2rem",
          }}
        >
          Loading songs...
        </div>
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
      <Header>
        <HeaderContent>
          <Logo href="/">
            <MusicNoteIcon />
            Musify
          </Logo>
          <PrimaryButton onClick={() => setOpenModal(true)}>
            Add Song
          </PrimaryButton>
        </HeaderContent>
      </Header>

      <MainContent>
        <MobilePanelToggle onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <CloseIcon /> : <FilterIcon />}
          {showSidebar ? "Hide Filters" : "Show Filters & Stats"}
        </MobilePanelToggle>

        <ContentGrid>
          {(showSidebar || window.innerWidth > 1024) && (
            <Sidebar>
              <Panel>
                <PanelHeader>
                  <PanelTitle>
                    <StatsIcon />
                    Statistics
                  </PanelTitle>
                </PanelHeader>
                {statsLoading ? (
                  <div>Loading stats...</div>
                ) : statsError ? (
                  <div style={{ color: "#ff6b6b" }}>
                    Error loading stats: {statsError}
                  </div>
                ) : stats ? (
                  <>
                    <StatItem>
                      <StatLabel>Total Songs</StatLabel>
                      <StatValue>{stats.totalSongs}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Artists</StatLabel>
                      <StatValue>{stats.totalArtists}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Albums</StatLabel>
                      <StatValue>{stats.totalAlbums}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Genres</StatLabel>
                      <StatValue>{stats.totalGenre}</StatValue>
                    </StatItem>
                  </>
                ) : (
                  <div>No stats available</div>
                )}
              </Panel>

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
                    onChange={(e) =>
                      handleFilterChange("title", e.target.value)
                    }
                  />
                </FilterGroup>
                <FilterGroup>
                  <FilterLabel>Filter by Artist</FilterLabel>
                  <FilterSelect
                    value={filters.artist}
                    onChange={(e) =>
                      handleFilterChange("artist", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFilterChange("genre", e.target.value)
                    }
                  >
                    <option value="">All Genres ({songs.length})</option>
                    {Array.from(new Set(songs.map((song) => song.genre)))
                      .sort()
                      .map((genre) => {
                        const count = songs.filter(
                          (song) => song.genre === genre
                        ).length;
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
                    onClick={clearAllFilters}
                    disabled={
                      !filters.title && !filters.artist && !filters.genre
                    }
                  >
                    Clear All Filters
                  </ClearFiltersButton>
                </FilterGroup>
              </Panel>
            </Sidebar>
          )}

          <div>
            <SongList>
              {filteredSongs.map((song) => (
                <SongCard key={song._id}>
                  <SongTitle>{song.title}</SongTitle>
                  <SongMeta>
                    <MetaLabel>Artist:</MetaLabel>
                    {song.artist}
                  </SongMeta>
                  <SongMeta>
                    <MetaLabel>Album:</MetaLabel>
                    {song.album}
                  </SongMeta>
                  <SongMeta>
                    <MetaLabel>Genre:</MetaLabel>
                    {song.genre}
                  </SongMeta>
                  <SongMeta>
                    <MetaLabel>Added:</MetaLabel>
                    {new Date(song.createdAt || "").toLocaleDateString()}
                  </SongMeta>
                  <ButtonGroup>
                    <SecondaryButton
                      onClick={(e) => {
                        e.stopPropagation();
                        if (song._id) handleEdit(song._id);
                      }}
                    >
                      Edit
                    </SecondaryButton>
                    <DangerButton
                      onClick={(e) => {
                        e.stopPropagation();
                        if (song._id) handleDelete(song._id);
                      }}
                    >
                      Delete
                    </DangerButton>
                  </ButtonGroup>
                </SongCard>
              ))}
            </SongList>

            {filteredSongs.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#b0b0b0",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <h3>No songs found</h3>
                <p>
                  {songs.length > 0
                    ? "Try adjusting your filters."
                    : "Add your first song to get started!"}
                </p>
                <PrimaryButton
                  onClick={() => setOpenModal(true)}
                  style={{ marginTop: "20px" }}
                >
                  Add New Song
                </PrimaryButton>
              </div>
            )}
          </div>
        </ContentGrid>
      </MainContent>
    </Container>
  );
}

export default App;
