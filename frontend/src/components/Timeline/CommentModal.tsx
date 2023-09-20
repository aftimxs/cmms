import Modal from "@mui/material/Modal";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {Container, InputAdornment, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from "dayjs";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import {NavigateBeforeOutlined, NavigateNextOutlined, Circle, ExpandLess, ExpandMore, EditCalendar, Engineering, AltRoute}
    from '@mui/icons-material';
import {useState} from "react";
import _ from 'lodash';
import {produce} from "immer"



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


const CommentModal = ({ open, setOpen, handleClick, bar }:any) => {

    const handleClose = () => {
        setOpen(false)
    };

    const color = (background:string) => {
         switch (background){
            case 'bg-success': {
                return 'green';
            }
            case 'bg-warning': {
                return '#F3E25B';
            }
            case 'bg-danger': {
                return 'red';
            }
            default: {
                return 'black';
            }
        }
     }

    let start = dayjs(bar.start, 'HH:mm:ss').format('HH:mm');
    let end = dayjs(bar.end, 'HH:mm:ss').format('HH:mm');
    let circleColor = color(bar.background);

    const [openList, setOpenList] = useState([{index:'open0', active:false}, {index:'open1', active:false}, {index:'open2', active:false}]);

    const handleListClick = (index:string) => {
        const y = _.findIndex(openList, ['index', index])
        const nextState = produce(openList, draftState => {
            draftState[y].active = !draftState[y].active
        })
        setOpenList(nextState)
    };
    //const [expanded, setExpanded] = useState(false);
    //const handleChange =
    //    (list: string) => (event, isExpanded: boolean) => {
    //      setExpanded(isExpanded ? panel : false);
    //};

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
                            <IconButton onClick={() => handleClick('back', bar)}>
                                <NavigateBeforeOutlined/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography color='black' id="modal-modal-title" align='center' variant="subtitle1">
                                <Circle sx={{color: circleColor, fontSize:'12px', verticalAlign:'0px'}}/> {bar? `${start} - ${end}`  : 'N/A'}
                            </Typography>
                            <Typography color='black' align='center' variant={'h6'}>
                                {bar.reason ? bar.reason : 'Uncommented'}
                            </Typography>
                        </Grid>
                        <Grid>
                            <IconButton onClick={() => handleClick('forward', bar)}>
                                <NavigateNextOutlined/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                    <Grid xs={12}>
                        <ThemeProvider theme={theme}>
                            <Stack spacing={1} direction={'column'} mt={2}>
                                <Button
                                    color={'gray'}
                                    sx = {{display: circleColor !== 'green' ? 'block' : 'none'}}
                                    variant='contained'
                                    onClick={() => {alert('clicked')}}
                                >
                                    {bar.description ? "Edit reason" : "Add reason"}
                                </Button>
                                <Button
                                    color={'gray'}
                                    sx = {{display: circleColor !== 'red' ? 'block' : 'none'}}
                                    variant='contained'
                                    onClick={() => {alert('clicked')}}
                                >
                                    Add scrap
                                </Button>
                            </Stack>
                            <Accordion >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                    <Typography variant="subtitle1">
                                      Add reason
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List
                                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                      component="nav"
                                    >
                                          <ListItemButton onClick={() => handleListClick('open0')} sx={{bgcolor:'#e8e8e8'}}>
                                              <ListItemIcon>
                                                  <EditCalendar />
                                              </ListItemIcon>
                                              <ListItemText primary="Operational" />
                                              {openList[0].active ? <ExpandLess /> : <ExpandMore />}
                                          </ListItemButton>
                                          <Collapse in={openList[0].active} timeout="auto" unmountOnExit>
                                              <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                              <List component="div" disablePadding>
                                                <ListItemButton sx={{ pl: 9 }}>
                                                    <ListItemText primary="No material" />
                                                </ListItemButton>
                                                <ListItemButton sx={{ pl: 9 }}>
                                                    <ListItemText primary="No operators" />
                                                </ListItemButton>
                                                  <ListItemButton sx={{ pl: 9 }}>
                                                    <ListItemText primary="Operators in training" />
                                                </ListItemButton>
                                              </List>
                                               <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                          </Collapse>
                                        <ListItemButton onClick={() => handleListClick('open1')} sx={{bgcolor:'#e8e8e8'}}>
                                              <ListItemIcon>
                                                  <Engineering/>
                                              </ListItemIcon>
                                              <ListItemText primary="Maintenance" />
                                              {openList[1].active ? <ExpandLess /> : <ExpandMore />}
                                          </ListItemButton>
                                          <Collapse in={openList[1].active} timeout="auto" unmountOnExit>
                                              <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                              <ListItemButton sx={{ pl: 9 }}>
                                                  <ListItemText primary="Planned maintenance" />
                                              </ListItemButton>
                                                <ListItemButton sx={{ pl: 9 }}>
                                                  <ListItemText primary="Unplanned maintenance" />
                                              </ListItemButton>
                                            </List>
                                               <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                          </Collapse>
                                        <ListItemButton onClick={() => handleListClick('open2')} sx={{bgcolor:'#e8e8e8'}}>
                                              <ListItemIcon>
                                                  <AltRoute/>
                                              </ListItemIcon>
                                              <ListItemText primary="Other" />
                                              {openList[2].active ? <ExpandLess /> : <ExpandMore />}
                                          </ListItemButton>
                                          <Collapse in={openList[2].active} timeout="auto" unmountOnExit>
                                              <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                              <ListItemButton sx={{ pl: 9 }}>
                                                  <ListItemText primary="Break" />
                                              </ListItemButton>
                                            </List>
                                               <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                          </Collapse>
                                    </List>
                                    <TextField
                                        id="description"
                                        label="Description"
                                        fullWidth
                                        sx={{mt:'10px'}}
                                        //defaultValue="Optional"
                                        //InputProps={{
                                        //  endAdornment: <InputAdornment position="end">pcs</InputAdornment>,
                                        //}}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                </Container>
            </Modal>
        </>
    )
};

export default CommentModal;