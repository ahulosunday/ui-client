import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PayOptions from '../payment/payOptions';
import NumbersSharpIcon from '@mui/icons-material/NumbersSharp';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import LockSharpIcon from '@mui/icons-material/LockSharp';
const images = [
  
   {
    url: '/logins',
    title: 'LOGIN',
    width: '30%',
    icon: <LockSharpIcon />,
  },
  {
    url: '/register',
    title: 'REGISTER',
    width: '30%',
    icon: <PersonAddAltSharpIcon />,
  },
  {
    url: '/payment/',
    title: 'PAYMENT',
    width: '40%',
    icon: <NumbersSharpIcon />,
  },
 
  
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', backgroundColor:'teal' }}>
      {images.map((image) => (
       
        <ImageButton
          focusRipple
          key={image.title}
         
          style={{
            width: image.width,
           
          }}
        >
         <Link to={image.url}>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
           
            {image.icon} <br />
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
           </Link>
        </ImageButton>
       
      ))}
    </Box>
  );
}
