import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {Container,} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import {useGetLineState, useGetShiftDowntimesQuery,} from "../../app/services/apiSplice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import DowntimeListItem from "./DowntimeListItem.tsx";
import List from "@mui/material/List";
import {skipToken} from "@reduxjs/toolkit/query";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: '0px',
    borderRadius: '4px',
};

const DowntimeModal = ({ open, setOpen, value }:any) => {

    const handleClose = () => {
        setOpen(false)
    };

    const lineParams = useAppSelector(state => state.line)

     const {shift} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            shift: state? state['shift'][0] : undefined,
        })
    })

    const {data:allDowntimes} = useGetShiftDowntimesQuery(shift ? {shiftId: shift?.id} : skipToken);

    return(
        <>
            <Modal
              open={open && value===2}
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
                            <Typography color='black' id="modal-modal-title" align='center' variant="h5">
                                Downtimes
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 450,
                            overflow: 'auto',
                            maxHeight: 300,
                        }}
                    >
                        {allDowntimes?.map((period:any, index:number) => <DowntimeListItem
                                key={index}
                                period={period}
                            />
                        )}
                    </List>
                </Grid>
                </Container>
            </Modal>
        </>
    )
};

export default DowntimeModal;