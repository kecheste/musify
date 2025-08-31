import { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { createSong } from "../store/actions/songActions.ts";

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

const MusicIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18V5L21 3V16M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18ZM21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16Z"
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
  background: rgba(27, 27, 27, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

const Modal = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border-radius: 16px;
  padding: 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
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
    border-color: #ffdc9bff;
    box-shadow: 0 0 0 3px rgba(226, 140, 69, 0.2);
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
  background: linear-gradient(135deg, #e2914565 0%, #adadadff 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(110, 69, 226, 0.4);
  }
`;

interface CreateModalProps {
  onClose: () => void;
}

export default function CreateModal({ onClose }: CreateModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
    durationSec: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.title && form.artist) {
      const songData = {
        title: form.title,
        artist: form.artist,
        album: form.album,
        genre: form.genre,
        // Only include year and duration if they have values
        ...(form.year && { year: parseInt(form.year) }),
        ...(form.durationSec && { durationSec: parseInt(form.durationSec) }),
      };
      dispatch(createSong(songData));
      onClose();
    }
  };

  const isFormValid = form.title.trim() !== "" && form.artist.trim() !== "";

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            <MusicIcon />
            Add New Song
          </Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <Form>
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
            <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
              Add Song
            </SubmitButton>
          </ButtonRow>
        </Form>
      </Modal>
    </Overlay>
  );
}
