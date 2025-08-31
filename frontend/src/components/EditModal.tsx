import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { updateSong } from "../store/actions/songActions.ts";
import type { Song } from "../store/songSlice.ts";

// Icons
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

const EditIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13M18.4142 5.41421C19.1953 4.63316 20.4616 4.63316 21.2426 5.41421C22.0237 6.19526 22.0237 7.46159 21.2426 8.24264L12.3431 17.1421C12.1536 17.3316 11.8978 17.4384 11.6314 17.4384H8.56066C8.00837 17.4384 7.56066 16.9907 7.56066 16.4384V13.3677C7.56066 13.1013 7.66742 12.8455 7.85696 12.656L16.7564 3.75646L18.4142 5.41421Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Styled components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(37, 37, 37, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

const Modal = styled.div`
  background: rgba(49, 49, 49, 0.95);
  border-radius: 16px;
  padding: 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transform: scale(0.95);
  animation: modalAppear 0.2s ease forwards;

  @keyframes modalAppear {
    to {
      transform: scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const Form = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #b0b0b0;
`;

const Input = styled.input`
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #8a7865ff;
    box-shadow: 0 0 0 3px rgba(110, 69, 226, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: #e0e0e0;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #383838ff 0%, #d3c188ff 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(223, 154, 108, 0.4);
  }
`;

const SongInfo = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #b0b0b0;
  border-left: 3px solid #e28c45ff;
`;

interface EditModalProps {
  song: Song | null;
  onClose: () => void;
}

export default function EditModal({ song, onClose }: EditModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
    durationSec: "",
  });

  // This is to pre-fill form when song data changes
  useEffect(() => {
    if (song) {
      setForm({
        title: song.title || "",
        artist: song.artist || "",
        album: song.album || "",
        genre: song.genre || "",
        year: song.year ? song.year.toString() : "",
        durationSec: song.durationSec ? song.durationSec.toString() : "",
      });
    }
  }, [song]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (song && song._id) {
      const updatedSong = {
        ...song,
        title: form.title,
        artist: form.artist,
        album: form.album,
        genre: form.genre,
        year: form.year ? parseInt(form.year) : undefined,
        durationSec: form.durationSec ? parseInt(form.durationSec) : undefined,
      };
      dispatch(updateSong(updatedSong));
      onClose();
    }
  };

  const isFormValid = form.title.trim() !== "" && form.artist.trim() !== "";
  const hasChanges =
    form.title !== song?.title ||
    form.artist !== song?.artist ||
    form.album !== song?.album ||
    form.genre !== song?.genre ||
    form.year !== (song?.year ? song.year.toString() : "") ||
    form.durationSec !== (song?.durationSec ? song.durationSec.toString() : "");

  if (!song) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            <EditIcon />
            Edit Song
          </Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <Form>
          <SongInfo>
            Editing: <strong>{song.title}</strong> by{" "}
            <strong>{song.artist}</strong>
          </SongInfo>

          <InputGroup>
            <Label>Song Title *</Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter song title"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
          </InputGroup>

          <InputGroup>
            <Label>Artist *</Label>
            <Input
              type="text"
              name="artist"
              placeholder="Enter artist name"
              value={form.artist}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Album</Label>
            <Input
              type="text"
              name="album"
              placeholder="Enter album name"
              value={form.album}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Genre</Label>
            <Input
              type="text"
              name="genre"
              placeholder="Enter genre (e.g., rock, pop, jazz)"
              value={form.genre}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Year</Label>
            <Input
              type="number"
              name="year"
              placeholder="Release year (e.g., 2023)"
              value={form.year}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear()}
            />
          </InputGroup>

          <InputGroup>
            <Label>Duration (seconds)</Label>
            <Input
              type="number"
              name="durationSec"
              placeholder="Duration in seconds (e.g., 180 for 3:00)"
              value={form.durationSec}
              onChange={handleChange}
              min="1"
              max="7200"
            />
            {form.durationSec && (
              <div
                style={{ fontSize: "12px", color: "#88d3ce", marginTop: "4px" }}
              >
                ≈ {Math.floor(parseInt(form.durationSec) / 60)}:
                {(parseInt(form.durationSec) % 60).toString().padStart(2, "0")}
              </div>
            )}
          </InputGroup>

          <ButtonRow>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <SubmitButton
              onClick={handleSubmit}
              disabled={!isFormValid || !hasChanges}
            >
              Update Song
            </SubmitButton>
          </ButtonRow>
        </Form>
      </Modal>
    </Overlay>
  );
}
