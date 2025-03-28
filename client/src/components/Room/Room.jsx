import React, { useEffect, useState } from "react";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteRoomMutation,
  useEditRoomMutation,
  useGetRoomQuery,
} from "../../redux/api";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupIcon from "@mui/icons-material/Group"; // Add this import
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // Add this import
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { callActive } from "../../redux/callreducer";
import RemoveUserFromRoom from "./RemoveUserFromRoom";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "../Chat/Chat";
import "../../index.css";
import "./Room.css"; // Add this import

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const inCall = useSelector(callActive);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isProtected, setIsProtected] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add this state
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // Add this state
  const {
    data: room,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetRoomQuery({ userId: user._id, roomId });

  const [
    deleteRoom,
    {
      data: deleteData,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      error: deleteError,
    },
  ] = useDeleteRoomMutation();

  const [editRoom] = useEditRoomMutation();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openMembers, setOpenMembers] = useState(false); // Add this state

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleOpenMembers = () => {
    setOpenMembers(true);
  };

  const handleCloseMembers = () => {
    setOpenMembers(false);
  };

  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const handleClick = async () => {
    await deleteRoom({ userId: user._id, roomId });
  };

  const handleChange = async () => {
    await editRoom({ userId: user._id, roomId, isProtected: !isProtected });
    setIsProtected(!isProtected);
  };

  const handleDeleteRoom = async () => {
    handleCloseDeleteConfirm(); // Close the dialog
    try {
      await deleteRoom({ userId: user._id, roomId });
      // The useEffect for isDeleteSuccess will handle navigation and toast
    } catch (err) {
      toast.error("Failed to delete room");
    }
  };

  useEffect(() => {
    if (isSuccess) setIsProtected(room.isProtected);
    if (isError) toast.error(error.message);
    //eslint-disable-next-line
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData.message);
      navigate("/rooms");
    }
    if (isDeleteError) {
      toast.error(deleteError.message);
    }
    //eslint-disable-next-line
  }, [isDeleteSuccess, isDeleteError]);

  const filteredUsers = room?.users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isFetching || isDeleteLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isSuccess && (
        <>
          {!inCall && (
            <AppBar
              color="inherit"
              elevation={1}
              position="sticky"
              sx={{ top: 65 }}
            >
              <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  <div
                    className="animate-charcter"
                    style={{ fontSize: "25px", paddingLeft: "8px" }}
                  >
                    {room.name}
                  </div>
                </Typography>
                <Typography
                  noWrap
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 5 }}
                >
                  {room.users.map((user) => (
                    <span
                      className="text-uppercase"
                      style={{ fontSize: "18px" }}
                      key={user.userId}
                    >
                      {user.userId === room.host ? `${user.userName} (host)` : ""}
                    </span>
                  ))}
                </Typography>

                <IconButton
                  disableRipple
                  onClick={handleMenuClick}
                  sx={{
                    display: { xs: "block", md: "none", color: grey[900] },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  {room.host === user._id && (
                    <Tooltip arrow title="Add User in room">
                      <button
                        onClick={handleClickOpen}
                        className="btn btn-primary mx-2"
                      >
                        <PersonAddAlt1Icon />
                      </button>
                    </Tooltip>
                  )}

                  {room.host === user._id && (
                    <Tooltip arrow title="Remove User from room">
                      <button
                        onClick={handleClickOpenRemove}
                        className="btn btn-danger mx-2"
                      >
                        <PersonRemoveIcon />
                      </button>
                    </Tooltip>
                  )}

                  <Tooltip arrow title="Leave Room">
                    <button
                      onClick={handleClick}
                      className="btn btn-danger mx-2"
                    >
                      <ExitToAppIcon />
                    </button>
                  </Tooltip>

                  {room.host === user._id && (
                    <>
                      {isProtected ? (
                        <Tooltip arrow title="Unlock Room">
                          <button
                            onClick={handleChange}
                            className="btn btn-success mx-2"
                          >
                            <LockOpenIcon />
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip arrow title="Lock Room">
                          <button
                            onClick={handleChange}
                            className="btn btn-danger mx-2"
                          >
                            <LockIcon />
                          </button>
                        </Tooltip>
                      )}
                    </>
                  )}

                  <Tooltip arrow title="View Members">
                    <button onClick={handleOpenMembers} className="btn btn-primary mx-2">
                      <GroupIcon />
                    </button>
                  </Tooltip>

                  {room.host === user._id && (
                    <Tooltip arrow title="Delete Room">
                      <button
                        onClick={handleOpenDeleteConfirm}
                        className="btn btn-danger mx-2"
                      >
                        <DeleteForeverIcon />
                      </button>
                    </Tooltip>
                  )}
                </Box>
              </Toolbar>
            </AppBar>
          )}

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add User:</DialogTitle>
            <DialogContent>
              <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openRemove}
            onClose={handleCloseRemove}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Remove User:</DialogTitle>
            <DialogContent>
              <RemoveUserFromRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRemove}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openMembers} onClose={handleCloseMembers} maxWidth="sm" fullWidth>
            <DialogTitle>Room Members:</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
                className="search-field" // Add this class
              />
              <ul className="member-list"> {/* Add this class */}
                {filteredUsers
                  .filter((user) => user.userId === room.host)
                  .map((user) => (
                    <li key={user.userId} className="member-item"> {/* Add this class */}
                      {user.userName} (host)
                    </li>
                  ))}
                {filteredUsers
                  .filter((user) => user.userId !== room.host)
                  .map((user) => (
                    <li key={user.userId} className="member-item"> {/* Add this class */}
                      {user.userName}
                    </li>
                  ))}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseMembers}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDeleteConfirm}
            onClose={handleCloseDeleteConfirm}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">
              {"Delete Room?"}
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this room? This action cannot be undone and all messages will be permanently lost.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
              <Button onClick={handleDeleteRoom} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            {room.host === user._id && (
              <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                  <PersonAddAlt1Icon fontSize="small" />
                </ListItemIcon>
                Add User
              </MenuItem>
            )}

            {room.host === user._id && (
              <MenuItem onClick={handleClickOpenRemove}>
                <ListItemIcon>
                  <PersonRemoveIcon fontSize="small" />
                </ListItemIcon>
                RemoveUser
              </MenuItem>
            )}

            <MenuItem onClick={handleClick}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              Leave Room
            </MenuItem>

            {room.host === user._id && (
              <MenuItem onClick={handleChange}>
                {isProtected ? (
                  <>
                    <ListItemIcon>
                      <LockOpenIcon fontSize="small" />
                    </ListItemIcon>
                    Unlock Room
                  </>
                ) : (
                  <>
                    <ListItemIcon>
                      <LockIcon fontSize="small" />
                    </ListItemIcon>
                    Lock Room
                  </>
                )}
              </MenuItem>
            )}

            {room.host === user._id && (
              <MenuItem onClick={handleOpenDeleteConfirm}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                Delete Room
              </MenuItem>
            )}
          </Menu>

          <Box sx={inCall ? { paddingTop: "35px" } : { paddingTop: "0px" }}>
            <Chat
              userId={user._id}
              name={user.name}
              room={room}
              prevMessages={room.messages}
              roomId={roomId} // Pass roomId to Chat component
              roomHost={room.host} // Pass roomHost to Chat component
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Room;
