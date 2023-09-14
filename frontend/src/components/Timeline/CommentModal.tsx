import Modal from "@mui/material/Modal";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import _ from "lodash";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: '0px',
    borderRadius: '4px',
};

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
  }

  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

const theme = createTheme({
  palette: {
    gray: {
      main: '#9A9A9A',
      light: '#DEDEDE',
      dark: '#7B7B7B',
      contrastText: '#FFFFFF',
    },
  },
});


const CommentModal = ({ open, setOpen, info, handlers }:any) => {

    const handleClose = () => {
        setOpen(false)
    };

    return(
        <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                <Container sx={style}>
                <Grid
                    container
                    rowSpacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <Grid container spacing={5}>
                        <Grid>
                            <IconButton onClick={handlers.handleBack}>
                                <NavigateBeforeOutlinedIcon/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography color='black' id="modal-modal-title" align='center' variant="subtitle2">
                                {info.start} - {info.end}
                            </Typography>
                            <Typography color='black' align='center' variant={'h6'}>
                                {info.reason ? info.reason : 'Uncommented'}
                            </Typography>
                        </Grid>
                        <Grid>
                            <IconButton onClick={handlers.handleForward}>
                                <NavigateNextOutlinedIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                    <Grid xs={12}>
                        <ThemeProvider theme={theme}>
                            <Stack spacing={1} direction={'column'} mt={2}>
                                <Button
                                    color={'gray'}
                                    variant='contained'
                                    onClick={() => {alert('clicked')}}
                                >
                                    {info.description ? "Edit reason" : "Add reason"}
                                </Button>
                            </Stack>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                </Container>
            </Modal>
        </>
    )
};

export default CommentModal;