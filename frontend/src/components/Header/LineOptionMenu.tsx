import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
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
import {areaAdded, cellAdded} from "../../features/lineParamsSlice.ts";
import {useState} from "react";


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
    const lineParams = useAppSelector(state => state.line)

    const handleClose = () => {
        setOpen(false)
    };

    const handleClick = ({cell, area}:any) => {
        dispatch(cellAdded(cell))
        dispatch(areaAdded(area))
    }

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

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (_event:any, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const checkSelected = (line:any) => {
        return line.area === lineParams.area && line.number === lineParams.cell;
    }

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
                         alignItems="center"
                     >
                         <Grid spacing={5}>
                             <Typography color='black' id="modal-modal-title" align='center' variant="h5">
                                 Production Line
                             </Typography>
                         </Grid>
                         <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                         <Grid xs={12}>
                             <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
                                                 onClick={() => handleClick({cell:line.number,area:line.area})}
                                                 selected={checkSelected(line)}
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

                             <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
                                                 onClick={() => handleClick({cell:line.number,area:line.area})}
                                                 selected={checkSelected(line)}
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

                             <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
                                                 onClick={() => handleClick({cell:1,area:'Pleating'})}
                                                 selected={checkSelected({area: 'Pleating', number: 1})}
                                             >
                                             <ListItemIcon>
                                                 <MasksIcon />
                                             </ListItemIcon>
                                             <ListItemText primary='Pleater' />
                                         </ListItemButton>
                                     </List>
                                 </AccordionDetails>
                             </Accordion>

                             <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
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
                                                 onClick={() => handleClick({cell:1,area:'Cepheid'})}
                                                 selected={checkSelected({area: 'Cepheid', number: 1})}
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