import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import SecurityIcon from '@mui/icons-material/Security';
import "./Landing.scss";

// Custom styled components
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
  color: "white",
  fontWeight: "bold",
  padding: "12px 30px",
  borderRadius: "30px",
  boxShadow: "0 4px 20px rgba(106, 17, 203, 0.4)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 7px 25px rgba(106, 17, 203, 0.5)",
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  fontSize: "80px",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  }
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  borderRadius: "0 0 50% 50% / 20%",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(15),
  marginBottom: theme.spacing(8),
  textAlign: "center",
}));

const Landing = () => {
  return (
    <Box className="landing-page">
      <HeroSection>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            Interaction Application
          </Typography>
          
          <Typography variant="h5" component="h2" color="text.secondary" gutterBottom
            sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}>
            Connect, collaborate, and communicate with anyone, anywhere. 
            Experience high-quality video calls and seamless messaging.
          </Typography>
          
          <GradientButton 
            component={Link} 
            to="/auth" 
            size="large"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Get Started
          </GradientButton>
        </Container>
      </HeroSection>
      
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Features
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <VideocamIcon fontSize="inherit" />
              </IconContainer>
              <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                HD Video Calls
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Crystal clear video meetings with up to 50 participants. Share your screen and collaborate in real-time.
              </Typography>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <ChatIcon fontSize="inherit" />
              </IconContainer>
              <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                Instant Messaging
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Send messages, share files, and create group chats. Keep conversations organized in one place.
              </Typography>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <SecurityIcon fontSize="inherit" />
              </IconContainer>
              <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                Secure Connection
              </Typography>
              <Typography variant="body1" color="text.secondary">
                End-to-end encryption for all your communications. Your privacy is our top priority.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: "center", mt: 8, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to get started?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}>
            Join thousands of users who trust our platform for their communication needs.
          </Typography>
          <GradientButton component={Link} to="/auth" size="large">
            Sign Up Now
          </GradientButton>
        </Box>
      </Container>
      
      <Box sx={{ bgcolor: "rgba(0,0,0,0.05)", py: 4, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Interaction Application. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;