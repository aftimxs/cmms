import Modal from "@mui/material/Modal";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
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


const CommentModal = ({ open, setOpen, handleClick, downtime }:any) => {

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

    let start = dayjs(downtime.start, 'HH:mm:ss').format('HH:mm');
    let end = dayjs(downtime.end, 'HH:mm:ss').format('HH:mm');
    let circleColor = color(downtime.background);

    const [openList, setOpenList] = useState({open0:false, open1:false, open2:false});

    const handleListClick = (index) => {
        const caca = {...openList}
        Object.keys(openList).forEach((item) => {
                if (item === `open${index}`){
                    caca.append(!openList[item])
                } else {
                    caca.append(openList[item])
                }
        })
        console.log(caca)
        setOpenList(

        );
    };
    console.log(openList)
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
                            <IconButton onClick={() => handleClick('back', downtime)}>
                                <NavigateBeforeOutlined/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography color='black' id="modal-modal-title" align='center' variant="subtitle1">
                                <Circle sx={{color: circleColor, fontSize:'12px', verticalAlign:'0px'}}/> {downtime? `${start} - ${end}`  : 'N/A'}
                            </Typography>
                            <Typography color='black' align='center' variant={'h6'}>
                                {downtime.reason ? downtime.reason : 'Uncommented'}
                            </Typography>
                        </Grid>
                        <Grid>
                            <IconButton onClick={() => handleClick('forward', downtime)}>
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
                                    {downtime.description ? "Edit reason" : "Add reason"}
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
                                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                      Add reason
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List
                                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                      component="nav"
                                    >
                                          <ListItemButton onClick={() => handleListClick(0)}>
                                              <ListItemIcon>
                                                  <EditCalendar />
                                              </ListItemIcon>
                                              <ListItemText primary="Operational" />
                                              {openList ? <ExpandLess /> : <ExpandMore />}
                                          </ListItemButton>
                                          <Collapse in={openList[0]} timeout="auto" unmountOnExit>
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
                                          </Collapse>
                                        <ListItemButton onClick={() => handleListClick(1)}>
                                              <ListItemIcon>
                                                  <Engineering/>
                                              </ListItemIcon>
                                              <ListItemText primary="Maintenance" />
                                              {openList ? <ExpandLess /> : <ExpandMore />}
                                          </ListItemButton>
                                          <Collapse in={openList[1]} timeout="auto" unmountOnExit>
                                              <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                              <ListItemButton sx={{ pl: 9 }}>
                                                  <ListItemText primary="Planned maintenance" />
                                              </ListItemButton>
                                                <ListItemButton sx={{ pl: 9 }}>
                                                  <ListItemText primary="Unplanned maintenance" />
                                              </ListItemButton>
                                            </List>
                                          </Collapse>
                                        <ListItemButton onClick={() => handleListClick(2)}>
                                              <ListItemIcon>
                                                  <AltRoute/>
                                              </ListItemIcon>
                                              <ListItemText primary="Other" />
                                              {openList ? <ExpandLess /> : <ExpandMore />}
                                          </ListItemButton>
                                          <Collapse in={openList[2]} timeout="auto" unmountOnExit>
                                              <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                              <ListItemButton sx={{ pl: 9 }}>
                                                  <ListItemText primary="Break" />
                                              </ListItemButton>
                                            </List>
                                          </Collapse>
                                    </List>
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