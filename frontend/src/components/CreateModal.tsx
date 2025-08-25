import { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { addSong } from "../store/songSlice";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(36, 36, 36, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: #f2f2f2;
  color: #242424;
  padding: 20px;
  border: 1px solid #242424;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #242424;
  background: transparent;
  color: #242424;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #242424;
  background: #242424;
  color: #e6e6e6;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: #e6e6e6;
    color: #242424;
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addSong(form));
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Title>Add a Song</Title>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="artist"
          placeholder="Artist"
          value={form.artist}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="album"
          placeholder="Album"
          value={form.album}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />
        <ButtonRow>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}

