import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { fetchSongs, addSong } from "./store/songSlice";
import styled from "@emotion/styled";

// Components
import CreateModal from "./components/CreateModal.tsx";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.songs); 

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const Header = styled.div`
    width: 100%;
    margin: 0;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #242424;
    background-color: #f2f2f2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  `;

  const Logo = styled.a`
    color: #242424;
    font-size: 40px;
    text-decoration: none;
  `;

  const SongList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 80px;
    padding-bottom: 50px;
    margin: 20px 0;
    width: 100%;
    max-width: 600px;
  `;

  const Song = styled.div`
    border: 1px solid #242424;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: background-color 0.2s ease, color 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: #242424;
      color: #e6e6e6;
    }
  `;

  const Title = styled.div`
    font-weight: bold;
    font-size: 18px;
  `;

  const Meta = styled.div`
    font-size: 14px;
    opacity: 0.8;
  `;

  const Button = styled.button`
    color: #e6e6e6;
    background-color: #242424;
    border: none;
    padding: 10px 30px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border 0.2s ease;

    &:hover {
      background-color: #e6e6e6;
      color: #242424;
      border: 0.5px solid #242424;
    }
  `;

  return (
    <main className="container">
      {
        openModal && <CreateModal onClose={
          () => setOpenModal(false)
        } />
      }
      <Header>
        <Logo href="/">Musify</Logo>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Song
        </Button>
      </Header>
      { loading && <p>Loading...</p> }

      <SongList>
        {list.map((song) => (
          <Song key={song._id}>
            <Title>{song.title}</Title>
            <Meta>Artist: {song.artist}</Meta>
            <Meta>Album: {song.album}</Meta>
            <Meta>Genre: {song.genre}</Meta>
            <Meta>
              Added: {new Date(song.createdAt).toLocaleDateString()}
            </Meta>
          </Song>
        ))}
      </SongList>
    </main>
  );
}

export default App;

