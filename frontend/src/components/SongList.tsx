import React from "react";
import type { Song } from "../store/songSlice";
import styled from "@emotion/styled";

const SongListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  align-content: start; /* Prevent stretching to fill container height */
  height: fit-content;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SongCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  height: fit-content;
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

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #b0b0b0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    margin: 0 0 16px 0;
    color: #ffffff;
  }

  p {
    margin: 0 0 20px 0;
  }
`;

interface SongListProps {
  songs: Song[];
  filteredSongs: Song[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const SongListWrapper = styled.div`
  height: fit-content;
  width: 100%;
`;

const SongList: React.FC<SongListProps> = ({
  songs,
  filteredSongs,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  if (filteredSongs.length === 0) {
    return (
      <SongListWrapper>
        <EmptyStateContainer>
          <h3>No songs found</h3>
          <p>
            {songs.length > 0
              ? "Try adjusting your filters."
              : "Add your first song to get started!"}
          </p>
          <PrimaryButton onClick={onAddNew}>Add New Song</PrimaryButton>
        </EmptyStateContainer>
      </SongListWrapper>
    );
  }

  return (
    <SongListWrapper>
      <SongListContainer>
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
            {song.year && (
              <SongMeta>
                <MetaLabel>Year:</MetaLabel>
                {song.year}
              </SongMeta>
            )}
            {song.durationSec && (
              <SongMeta>
                <MetaLabel>Duration:</MetaLabel>
                {Math.floor(song.durationSec / 60)}:
                {(song.durationSec % 60).toString().padStart(2, "0")}
              </SongMeta>
            )}
            <SongMeta>
              <MetaLabel>Added:</MetaLabel>
              {new Date(song.createdAt || "").toLocaleDateString()}
            </SongMeta>
            <ButtonGroup>
              <SecondaryButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (song._id) onEdit(song._id);
                }}
              >
                Edit
              </SecondaryButton>
              <DangerButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (song._id) onDelete(song._id);
                }}
              >
                Delete
              </DangerButton>
            </ButtonGroup>
          </SongCard>
        ))}
      </SongListContainer>
    </SongListWrapper>
  );
};

export default SongList;
