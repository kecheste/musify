import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import styled from '@emotion/styled';

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

const StatSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 15px 0;
  color: #4169e1;
  font-size: 16px;
`;

const StatsPanel: React.FC = () => {
  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useSelector((state: RootState) => state.stats);

  return (
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
          <StatSection>
            <SectionTitle>Overview</SectionTitle>
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
          </StatSection>

          <StatSection>
            <SectionTitle>Averages</SectionTitle>
            <StatItem>
              <StatLabel>Songs per Artist</StatLabel>
              <StatValue>{stats.averageSongsPerArtist}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Songs per Album</StatLabel>
              <StatValue>{stats.averageSongsPerAlbum}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Albums per Artist</StatLabel>
              <StatValue>{stats.averageAlbumsPerArtist}</StatValue>
            </StatItem>
            {stats.averageDuration > 0 && (
              <StatItem>
                <StatLabel>Avg Duration</StatLabel>
                <StatValue>
                  {Math.floor(stats.averageDuration / 60)}:
                  {(stats.averageDuration % 60).toFixed(0).padStart(2, '0')}
                </StatValue>
              </StatItem>
            )}
          </StatSection>

          {stats.totalDuration > 0 && (
            <StatSection>
              <SectionTitle>Duration</SectionTitle>
              <StatItem>
                <StatLabel>Total Duration</StatLabel>
                <StatValue>
                  {Math.floor(stats.totalDuration / 3600)}h{' '}
                  {Math.floor((stats.totalDuration % 3600) / 60)}m
                </StatValue>
              </StatItem>
            </StatSection>
          )}

          {(stats.oldestSong || stats.newestSong) && (
            <StatSection>
              <SectionTitle>Year Range</SectionTitle>
              {stats.oldestSong && (
                <StatItem>
                  <StatLabel>Oldest Song</StatLabel>
                  <StatValue>{stats.oldestSong}</StatValue>
                </StatItem>
              )}
              {stats.newestSong && (
                <StatItem>
                  <StatLabel>Newest Song</StatLabel>
                  <StatValue>{stats.newestSong}</StatValue>
                </StatItem>
              )}
            </StatSection>
          )}

          {stats.genreStats && stats.genreStats.length > 0 && (
            <StatSection>
              <SectionTitle>Top Genres</SectionTitle>
              {stats.genreStats.slice(0, 5).map((genre) => (
                <StatItem key={genre.genre}>
                  <StatLabel>{genre.genre}</StatLabel>
                  <StatValue>{genre.songCount}</StatValue>
                </StatItem>
              ))}
            </StatSection>
          )}

          {stats.artistStats && stats.artistStats.length > 0 && (
            <StatSection>
              <SectionTitle>Top Artists</SectionTitle>
              {stats.artistStats.slice(0, 5).map((artist) => (
                <StatItem key={artist.artist}>
                  <StatLabel>{artist.artist}</StatLabel>
                  <StatValue>
                    {artist.songCount} songs, {artist.albumCount} albums
                  </StatValue>
                </StatItem>
              ))}
            </StatSection>
          )}

          {stats.albumStats && stats.albumStats.length > 0 && (
            <StatSection>
              <SectionTitle>Top Albums</SectionTitle>
              {stats.albumStats.slice(0, 5).map((album) => (
                <StatItem key={`${album.artist}-${album.album}`}>
                  <StatLabel>{album.album}</StatLabel>
                  <StatValue>
                    {album.songCount} songs{album.year ? ` (${album.year})` : ''}
                  </StatValue>
                </StatItem>
              ))}
            </StatSection>
          )}
        </>
      ) : (
        <div>No stats available</div>
      )}
    </Panel>
  );
};

export default StatsPanel;
