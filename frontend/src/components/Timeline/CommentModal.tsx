import Modal from "@mui/material/Modal";
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
import {useEffect, useState} from "react";
import _ from 'lodash';
import {produce} from "immer"
import {
    useDowntimeUpdatedMutation,
    useLazyGetDowntimeQuery,
    useLazyGetScrapQuery,
    useScrapAddedMutation,
    useScrapDeletedMutation,
    useScrapUpdatedMutation
} from "../../app/services/apiSplice.ts";
import CommentButton from "./CommentButton.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import ScrapButton from "./ScrapButton.tsx";



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


const CommentModal = ({ open, setOpen, handleClick, setBarReason }:any) => {

    const handleClose = () => {
        setOpen(false)
    };

    //CONVERT BOOTSTRAP COLORS TO MUI
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

    //GET SELECTED BAR INFO
    const bar = useAppSelector(state => state.downtime)

    //LAZY QUERIES TRIGGERS DECLARATION
    const [getDowntime, {data:comments}] = useLazyGetDowntimeQuery()
    const [getScrap, {data:scrap}] = useLazyGetScrapQuery()

    //PULL INFO DEPENDING ON BAR TYPE
    useEffect(() => {
        if (bar.background === 'bg-success' ||  bar.background === 'bg-warning') {
            getScrap({id: `S${dayjs(bar.start, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${bar.shift}`})
        } else if (bar.background === 'bg-danger'){
            getDowntime(bar)
        }
    }, [bar]);


    //LOGIC TO CHECK IF THERE IS INFO IN THE QUERIED VARIABLES
    let start = dayjs(bar.start, 'DD-MM-YYYY HH:mm:ss Z').format('h:mm a');
    let end = dayjs(bar.end, 'DD-MM-YYYY HH:mm:ss Z').format('h:mm a');
    let circleColor = color(bar.background);
    let description = comments ? comments.description ? comments.description : '' : '';
    let reason = comments ? comments.reason ? comments.reason : '' : '';

    let scrapReason = scrap ? scrap.reason ? scrap.reason : '' : '';
    let scrapComments = scrap ? scrap.comments ? scrap.comments : '' : '';
    let scrapQuantity = scrap ? scrap.id.slice(1) === bar.id ? scrap.pieces ? scrap.pieces : 0 : 0 : 0;


    //UPDATE REASON
    const [reasonState, setReasonState] = useState('')
    const [scrapReasonState, setScrapReasonState] = useState('')
    useEffect(() => {
        if (bar.background === 'bg-success') {
            setScrapReasonState(scrapReason)
        } else if (bar.background === 'bg-warning') {
            setScrapReasonState(scrapReason)
            setReasonState(reason)
        } else if (bar.background === 'bg-danger') {
            setReasonState(reason)
        }
    }, [bar, reason, open, handleClick]);


    //OPEN REASON LIST SUBCATEGORIES
    const [openList, setOpenList] = useState([{index:'open0', active:false}, {index:'open1', active:false}, {index:'open2', active:false}]);
    const [openScrapList, setOpenScrapList] = useState([{index:'open0', active:false}, {index:'open1', active:false}, {index:'open2', active:false}]);


    //SET REASON SELECTION ACTIVE
    const handleListClick = (index:string) => {
        const y = _.findIndex(openList, ['index', index])
        const nextState = produce(openList, draftState => {
            draftState[y].active = !draftState[y].active
        })
        setOpenList(nextState)
    };

    //SET SCRAP REASON SELECTION ACTIVE
    const handleScrapListClick = (index:string) => {
        const y = _.findIndex(openScrapList, ['index', index])
        const nextState = produce(openScrapList, draftState => {
            draftState[y].active = !draftState[y].active
        })
        setOpenScrapList(nextState)
    };

    //MUTATION TRIGGERS
    const [updateDowntime] = useDowntimeUpdatedMutation()
    const [updateScrap] = useScrapUpdatedMutation()
    const [postScrap] = useScrapAddedMutation()
    const [deleteScrap] = useScrapDeletedMutation()

    //CHECK IF SCRAP PIECES ARE 0
    const checkScrapPieces = () => {
        if (scrap?.pieces === 0){
            deleteScrap(scrap)
        }
    }

    //CONTROL ACCORDIONS
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange = (panel: string) => (_event:any, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
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
                            <IconButton onClick={() => handleClick('back', bar)}>
                                <NavigateBeforeOutlined/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography color='black' id="modal-modal-title" align='center' variant="subtitle1">
                                <Circle sx={{color: circleColor, fontSize:'12px', verticalAlign:'0px'}}/> {bar? `${start} - ${end}`  : 'N/A'}
                            </Typography>
                            <Typography color='black' align='center' variant={'subtitle1'}>
                                {circleColor !== 'green' ? reason ? reason : 'Uncommented' : 'Good rate'}
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
                            <Accordion
                                sx={{display: circleColor !== 'green' ? 'block' : 'none'}}
                                expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                            >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                    <Typography variant="subtitle1">
                                        {reason ? "Edit reason" : "Add reason"}
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
                                                <CommentButton
                                                    comments={comments}
                                                    reasonState={reasonState}
                                                    setReasonState={setReasonState}
                                                    setBarReason={setBarReason}
                                                    title={'No material'}
                                                />
                                                <CommentButton
                                                    comments={comments}
                                                    reasonState={reasonState}
                                                    setReasonState={setReasonState}
                                                    setBarReason={setBarReason}
                                                    title={'No operators'}
                                                />
                                                <CommentButton
                                                    comments={comments}
                                                    reasonState={reasonState}
                                                    setReasonState={setReasonState}
                                                    setBarReason={setBarReason}
                                                    title={'Operators in training'}
                                                />
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
                                                <CommentButton
                                                      comments={comments}
                                                      reasonState={reasonState}
                                                      setReasonState={setReasonState}
                                                      setBarReason={setBarReason}
                                                      title={'Planned maintenance'}
                                                  />
                                                <CommentButton
                                                      comments={comments}
                                                      reasonState={reasonState}
                                                      setReasonState={setReasonState}
                                                      setBarReason={setBarReason}
                                                      title={'Unplanned maintenance'}
                                                  />
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
                                                <CommentButton
                                                      comments={comments}
                                                      reasonState={reasonState}
                                                      setReasonState={setReasonState}
                                                      setBarReason={setBarReason}
                                                      title={'Break'}
                                                  />
                                            </List>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                        </Collapse>
                                    </List>

                                    <TextField
                                        id="description"
                                        label="Description"
                                        helperText="Optional"
                                        fullWidth
                                        sx={{mt:'10px'}}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        disabled={!reasonState}
                                        placeholder={description}
                                        onChange={(event) => updateDowntime({...comments, description: event.target.value})}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{display: circleColor !== 'red' ? 'block' : 'none'}}
                                 expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                            >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2bh-content"
                                  id="panel2bh-header"
                                >
                                    <Typography variant="subtitle1">
                                        {scrapQuantity ? "Edit scrap" : "Add scrap"}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        id="scrap"
                                        label="Scrapped"
                                        helperText={`Quantity of bad pieces (max: ${bar.parts})`}
                                        fullWidth
                                        type={'number'}
                                        inputProps={{min:0, max:bar.parts}}
                                        sx={{mt:'10px'}}
                                        defaultValue={`${scrapQuantity}`}
                                        onClick={() => postScrap({
                                            id: `S${bar.id}`,
                                            reason: null,
                                            pieces: null,
                                            comments: null,
                                            minute: dayjs(bar.start, 'DD-MM-YYYY HH:mm:ss Z').format('HH:mm:ss'),
                                            shift: bar.shift,
                                        })}
                                        onChange={(event) => updateScrap({
                                            id: `S${bar.id}`,
                                            reason: null,
                                            pieces: event.target.value,
                                            comments: null,
                                            minute: dayjs(bar.start, 'DD-MM-YYYY HH:mm:ss Z').format('HH:mm:ss'),
                                            shift: bar.shift
                                        })}
                                        onBlur={() => checkScrapPieces()}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">pcs</InputAdornment>,
                                        }}
                                    />

                                    <List
                                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                      component="nav"
                                    >
                                        <ListItemButton
                                            onClick={() => handleScrapListClick('open0')}
                                            sx={{bgcolor:'#e8e8e8'}}
                                            disabled={ !scrapQuantity }
                                        >
                                            <ListItemIcon>
                                                <EditCalendar />
                                            </ListItemIcon>
                                            <ListItemText primary="Material" />
                                            {openScrapList[0].active ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openScrapList[0].active} timeout="auto" unmountOnExit>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                                <ScrapButton
                                                    scrap={scrap}
                                                    updateScrap={updateScrap}
                                                    scrapReasonState={scrapReasonState}
                                                    setScrapReasonState={setScrapReasonState}
                                                    title={'Damaged material'}
                                                />
                                                <ScrapButton
                                                    scrap={scrap}
                                                    updateScrap={updateScrap}
                                                    scrapReasonState={scrapReasonState}
                                                    setScrapReasonState={setScrapReasonState}
                                                    title={'Wrong dimensions'}
                                                />
                                            </List>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                        </Collapse>
                                        <ListItemButton
                                            onClick={() => handleScrapListClick('open1')}
                                            sx={{bgcolor:'#e8e8e8'}}
                                            disabled={ !scrapQuantity }
                                        >
                                            <ListItemIcon>
                                                <Engineering/>
                                            </ListItemIcon>
                                            <ListItemText primary="Process" />
                                            {openScrapList[1].active ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openScrapList[1].active} timeout="auto" unmountOnExit>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                                <ScrapButton
                                                      scrap={scrap}
                                                      updateScrap={updateScrap}
                                                      scrapReasonState={scrapReasonState}
                                                      setScrapReasonState={setScrapReasonState}
                                                      title={'Bad assembly'}
                                                  />
                                                <ScrapButton
                                                      scrap={scrap}
                                                      updateScrap={updateScrap}
                                                      scrapReasonState={scrapReasonState}
                                                      setScrapReasonState={setScrapReasonState}
                                                      title={'Failed QC test'}
                                                  />
                                            </List>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                        </Collapse>
                                        <ListItemButton
                                            onClick={() => handleScrapListClick('open2')}
                                            sx={{bgcolor:'#e8e8e8'}}
                                            disabled={ !scrapQuantity }
                                        >
                                              <ListItemIcon>
                                                  <AltRoute/>
                                              </ListItemIcon>
                                              <ListItemText primary="Other" />
                                              {openScrapList[2].active ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openScrapList[2].active} timeout="auto" unmountOnExit>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                            <List component="div" disablePadding>
                                                <ScrapButton
                                                      scrap={scrap}
                                                      updateScrap={updateScrap}
                                                      scrapReasonState={scrapReasonState}
                                                      setScrapReasonState={setScrapReasonState}
                                                      title={'Other'}
                                                  />
                                            </List>
                                            <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                                        </Collapse>
                                    </List>

                                    <TextField
                                        id="scrap-comments"
                                        label="Extra comments"
                                        helperText="Optional"
                                        fullWidth
                                        sx={{mt:'10px'}}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        disabled={!scrapReasonState}
                                        placeholder={scrapComments}
                                        onChange={(event) => updateScrap({...scrap, comments: event.target.value})}
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