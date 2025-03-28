import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useCreateRoomMutation } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "../../index.scss";

const CreateRoomForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const [roomNameField, setRoomNameField] = useState("");

  const onSubmit = async (val) => {
    val.preventDefault();
    
    if (!roomNameField.trim()) {
      toast.error("Please enter a room name");
      return;
    }
    
    const data = {
      roomName: roomNameField,
      userId: user._id,
    };
    
    try {
      const response = await createRoom(data).unwrap();
      setRoomNameField("");
      toast.success("Room created successfully");
      
      // Navigate to the new room
      navigate(`/rooms/${response._id}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create room");
    }
  };

  return (
    <>
      <div className="foot2">
        <label className="fw-bold" htmlFor="roomName">
          Create new room
        </label>
        <form className="form-group d-flex" onSubmit={onSubmit}>
          <input
            required
            id="roomName"
            type="text"
            value={roomNameField}
            autoComplete="off"
            onChange={(e) => setRoomNameField(e.target.value)}
            className="form-control"
            disabled={isLoading}
          />
          <button type="submit" value="submit" className="btn btn-primary" disabled={isLoading}>
            <AddIcon />
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoomForm;
