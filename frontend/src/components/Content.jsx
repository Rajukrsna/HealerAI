import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import logo from '../assets/logo.svg';

const items = [
  {
    icon: <PsychologyRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Emotion Recognition',
    description:
      'Detect and analyze real-time emotional states using AI-powered sentiment analysis.',
  },
  {
    icon: <SelfImprovementRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Personalized Yoga Guidance',
    description:
      'Receive yoga poses tailored to your current emotional and mental state for inner balance.',
  },
  {
    icon: <FavoriteRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Mindful Meditation',
    description:
      'Access guided meditation sessions to reduce stress and promote mental clarity.',
  },
  {
    icon: <SentimentSatisfiedAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Emotional Wellness Tracking',
    description:
      'Track your mood patterns over time and improve emotional well-being with healthy habits.',
  },
];

export default function HealerFeaturesSection() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <img src={logo} alt="HealerAI Logo" style={{ width: '40%', height: 'auto' }} />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
