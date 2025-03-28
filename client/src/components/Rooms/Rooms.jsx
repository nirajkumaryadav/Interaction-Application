import React, { useState, useEffect, useCallback } from "react";
import { useGetRoomsQuery, useCreateRoomMutation } from "../../redux/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Badge,
  Tooltip,
  Chip,
  Avatar,
  CircularProgress,
  Button,
  Paper,
  Divider,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";
import "./Rooms.css";
import { useDispatch } from 'react-redux';
import { api } from '../../redux/api';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -15,
    top: 3,
  },
}));

const CreateRoomButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, 0.3)',
  marginBottom: theme.spacing(2),
}));

const Rooms = ({ setOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data, isLoading, isError, refetch } = useGetRoomsQuery(
    { userId: user?._id },
    { 
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000 // Poll every 10 seconds
    }
  );
  
  const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [roomNameField, setRoomNameField] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { roomId: currentRoomId } = useParams();

  const handleRefetch = useCallback(() => {
    setIsRefreshing(true);
    refetch()
      .then(() => {
        setIsRefreshing(false);
      })
      .catch(err => {
        console.error("Error refetching rooms:", err);
        setIsRefreshing(false);
      });
  }, [refetch]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomNameField.trim()) {
      toast.error("Please enter a room name");
      return;
    }
    
    setIsRefreshing(true);
    
    const roomData = {
      roomName: roomNameField,
      userId: user._id,
    };
    
    try {
      const response = await createRoom(roomData).unwrap();
      
      setRoomNameField("");
      setShowCreateForm(false);
      
      toast.success("Room created successfully!");
      
      await refetch();
      
      setIsRefreshing(false);
      
      navigate(`/rooms/${response._id}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create room");
      setIsRefreshing(false);
    }
  };

  const handleManualRefresh = () => {
    handleRefetch();
  };

  const filteredRooms = data?.rooms 
    ? data.rooms.filter((room) =>
        room && room.name ? room.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
    : [];

  return (
    <Box sx={{ width: "100%", maxWidth: 360, pt: 8, pb: 2, px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Your Rooms
        </Typography>
        <IconButton 
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          size="small"
          sx={{ 
            bgcolor: 'rgba(33, 150, 243, 0.1)',
            '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.2)' },
          }}
        >
          {isRefreshing ? (
            <CircularProgress size={20} />
          ) : (
            <RefreshIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2, overflow: 'visible' }}>
        <CardContent sx={{ p: 2 }}>
          {!showCreateForm ? (
            <CreateRoomButton 
              fullWidth 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setShowCreateForm(true)}
            >
              Create New Room
            </CreateRoomButton>
          ) : (
            <Box component="form" onSubmit={handleCreateRoom} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                Enter room name:
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  size="small"
                  value={roomNameField}
                  onChange={(e) => setRoomNameField(e.target.value)}
                  placeholder="Room name"
                  autoFocus
                  disabled={isCreating}
                  sx={{ mr: 1 }}
                />
                <IconButton 
                  type="submit" 
                  color="primary" 
                  disabled={isCreating}
                  sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                >
                  {isCreating ? <CircularProgress size={24} color="inherit" /> : <AddIcon />}
                </IconButton>
              </Box>
              <Button 
                size="small" 
                onClick={() => setShowCreateForm(false)}
                sx={{ alignSelf: 'flex-end' }}
                disabled={isCreating}
              >
                Cancel
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Paper 
        elevation={2} 
        sx={{ 
          p: 1, 
          mb: 3, 
          display: 'flex', 
          alignItems: 'center',
          borderRadius: 2,
          border: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          fullWidth
          size="small"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Paper>

      {isLoading || isCreating || isRefreshing ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box sx={{ p: 2, textAlign: 'center', color: 'error.main' }}>
          <Typography>Error loading rooms. Please try again.</Typography>
        </Box>
      ) : filteredRooms.length > 0 ? (
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <List disablePadding>
            {filteredRooms.map((room, index) => {
              const isCreator = room.host === user?._id;
              const isActive = room._id === currentRoomId;
              
              return (
                <React.Fragment key={room._id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    disablePadding
                    component={Link}
                    to={`/rooms/${room._id}`}
                    className={`room-item ${isActive ? 'active-room' : ''} ${isCreator ? 'creator-room' : 'joined-room'}`}
                    onClick={() => setOpen(false)}
                    sx={{
                      borderLeft: isActive ? '4px solid #2196f3' : isCreator ? '4px solid #4caf50' : 'none',
                      bgcolor: isActive ? 'rgba(33, 150, 243, 0.08)' : isCreator ? 'rgba(76, 175, 80, 0.04)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: isActive ? 'rgba(33, 150, 243, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                      }
                    }}
                  >
                    <ListItemButton>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: isCreator ? '#4caf50' : '#2196f3',
                            width: 40, 
                            height: 40,
                            mr: 1.5,
                            opacity: isActive ? 1 : 0.8,
                            boxShadow: isActive ? '0 0 8px rgba(33, 150, 243, 0.5)' : 'none'
                          }}
                        >
                          {isCreator ? <StarIcon /> : <GroupIcon />}
                        </Avatar>
                        
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: isCreator ? 600 : 400,
                                color: isActive ? 'primary.main' : isCreator ? 'success.dark' : 'text.primary',
                                fontSize: '1rem'
                              }}
                            >
                              {room.name}
                            </Typography>
                            
                            {isActive && (
                              <Chip 
                                label="Current" 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                              />
                            )}
                            
                            {isCreator && (
                              <Tooltip title="You created this room">
                                <Chip 
                                  label="Owner" 
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  sx={{ ml: isActive ? 1 : 1, height: 20, fontSize: '0.7rem' }}
                                />
                              </Tooltip>
                            )}
                          </Box>
                          
                          <Typography variant="caption" color="text.secondary">
                            {room.users.length} {room.users.length === 1 ? "member" : "members"}
                          </Typography>
                        </Box>
                        
                        <Badge 
                          badgeContent={room.users.length} 
                          color={isActive ? "primary" : isCreator ? "success" : "default"} 
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      ) : (
        <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
          <Typography>No rooms found</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Create a new room to get started!
          </Typography>
        </Box>
      )}
      
      <Paper elevation={1} sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Room Types</Typography>
        
        <Box component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#4caf50', mr: 1.5 }}>
            <StarIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
          <Typography variant="body2" color="text.secondary">Rooms you created</Typography>
        </Box>
        
        <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#2196f3', mr: 1.5 }}>
            <GroupIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
          <Typography variant="body2" color="text.secondary">Rooms you joined</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Rooms;
