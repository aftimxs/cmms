import _ from 'lodash';
import {useAppDispatch} from "../../app/hooks.ts";
import Modal from "@mui/material/Modal";
import {Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import {ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MasksIcon from '@mui/icons-material/Masks';


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


// @ts-ignore
const LineOptionMenu = ({open, setOpen}) => {

    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false)
    };

    const lines = [
        {id:'1', number:'1', area:'Welding'},
        {id:'2', number:'10', area:'Welding'},
        {id:'3', number:'11', area:'Welding'},
        {id:'4', number:'1', area:'Molding'},
        {id:'5', number:'2', area:'Molding'},
        {id:'6', number:'3', area:'Molding'},
        {id:'7', number:'4', area:'Molding'},
        {id:'8', number:'5', area:'Molding'},
    ]

    let linesByArea = _.groupBy(lines, 'area')

    return(
         <>
          {/*<Modal show={visibility.showPL} onHide={visibility.handleClosePL}>*/}
          {/*  <Modal.Header closeButton>*/}
          {/*    <Modal.Title>{title}</Modal.Title>*/}
          {/*  </Modal.Header>*/}
          {/*  <Modal.Body>*/}
          {/*      <div className="container-fluid py-3">*/}
          {/*          <Accordion>*/}
          {/*              <AccordionItem eventKey='0'>*/}
          {/*                  <AccordionHeader>Welding</AccordionHeader>*/}
          {/*                  <AccordionBody>*/}
          {/*                      <ToggleButtonGroup type={"radio"} name="lineOptions">*/}
          {/*                          {linesByArea.Welding.map((line:any) => (*/}
          {/*                              <ToggleButton*/}
          {/*                                  key={line.id}*/}
          {/*                                  id={line.id}*/}
          {/*                                  type={'radio'}*/}
          {/*                                  value={[line.id, line.number, line.area]}*/}
          {/*                                  // checked={}*/}
          {/*                                  onChange={handlePL}*/}
          {/*                              >*/}
          {/*                                  {`${line.area} ${line.number}`}*/}
          {/*                              </ToggleButton>*/}
          {/*                          ))}*/}
          {/*                      </ToggleButtonGroup>*/}
          {/*                  </AccordionBody>*/}
          {/*              </AccordionItem>*/}
          {/*              <AccordionItem eventKey='1'>*/}
          {/*                  <AccordionHeader>Molding</AccordionHeader>*/}
          {/*                  <AccordionBody>*/}
          {/*                      {linesByArea.Molding.map((line:any) => (*/}
          {/*                            <button key={line.id}*/}
          {/*                                    type="button"*/}
          {/*                                    // className={}*/}
          {/*                                    value={[line.id, line.number,line.area]}*/}
          {/*                                    onClick={handlePL}*/}
          {/*                            >*/}
          {/*                                {`${line.area} ${line.number}`}*/}

          {/*                            </button>*/}
          {/*                      ))}*/}
          {/*                  </AccordionBody>*/}
          {/*              </AccordionItem>*/}
          {/*          </Accordion>*/}
          {/*          <div className="list-group">*/}

          {/*          </div>*/}
          {/*      </div>*/}
          {/*  </Modal.Body>*/}
          {/*</Modal>*/}
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
                         alignItems="center"
                     >
                         <Grid spacing={5}>
                             <Typography color='black' id="modal-modal-title" align='center' variant="h5">
                                 Production Line
                             </Typography>
                         </Grid>
                         <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                         <Grid xs={12}>
                             <Accordion>
                                 <AccordionSummary
                                     expandIcon={<ExpandMore />}
                                     aria-controls="panel1-content"
                                     id="panel1-header"
                                 >
                                     <Typography variant="subtitle1">
                                         Welding
                                     </Typography>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                     <List
                                         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                         component="nav"
                                     >
                                         {linesByArea.Welding.map((line:any) => (
                                             <ListItemButton
                                                 sx={{bgcolor:'#e8e8e8'}}
                                                 key={line.id}
                                             >
                                             <ListItemIcon>
                                                 <ElectricBoltIcon />
                                             </ListItemIcon>
                                             <ListItemText primary={`${line.area} ${line.number}`} />
                                         </ListItemButton>
                                         ))}
                                     </List>
                                 </AccordionDetails>
                             </Accordion>

                             <Accordion>
                                 <AccordionSummary
                                     expandIcon={<ExpandMore />}
                                     aria-controls="panel2-content"
                                     id="panel2-header"
                                 >
                                     <Typography variant="subtitle1">
                                         Molding
                                     </Typography>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                     <List
                                         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                         component="nav"
                                     >
                                         {linesByArea.Molding.map((line:any) => (
                                             <ListItemButton
                                                 sx={{bgcolor:'#e8e8e8'}}
                                                 key={line.id}
                                             >
                                             <ListItemIcon>
                                                 <MicrowaveIcon />
                                             </ListItemIcon>
                                             <ListItemText primary={`${line.area} ${line.number}`} />
                                         </ListItemButton>
                                         ))}
                                     </List>
                                 </AccordionDetails>
                             </Accordion>

                             <Accordion>
                                 <AccordionSummary
                                     expandIcon={<ExpandMore />}
                                     aria-controls="panel3-content"
                                     id="panel3-header"
                                 >
                                     <Typography variant="subtitle1">
                                         Pleat
                                     </Typography>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                     <List
                                         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                         component="nav"
                                     >
                                         <ListItemButton
                                                 sx={{bgcolor:'#e8e8e8'}}
                                                 key={0}
                                             >
                                             <ListItemIcon>
                                                 <MasksIcon />
                                             </ListItemIcon>
                                             <ListItemText primary='Pleater' />
                                         </ListItemButton>
                                     </List>
                                 </AccordionDetails>
                             </Accordion>

                             <Accordion>
                                 <AccordionSummary
                                     expandIcon={<ExpandMore />}
                                     aria-controls="panel4-content"
                                     id="panel4-header"
                                 >
                                     <Typography variant="subtitle1">
                                         Clean Room
                                     </Typography>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                     <List
                                         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                         component="nav"
                                     >
                                         <ListItemButton
                                                 sx={{bgcolor:'#e8e8e8'}}
                                                 key={0}
                                             >
                                             <ListItemIcon>
                                                 <PrecisionManufacturingIcon />
                                             </ListItemIcon>
                                             <ListItemText primary='Cepheid' />
                                         </ListItemButton>
                                     </List>
                                 </AccordionDetails>
                             </Accordion>
                         </Grid>
                     </Grid>
                 </Container>
             </Modal>
        </>
    )
};

export default LineOptionMenu;