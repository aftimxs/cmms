import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Checkbox, Container, FormControl, FormControlLabel, FormGroup} from "@mui/material";
import _ from 'lodash';
import {useAppSelector} from "../../app/hooks.ts";
import {useGetLineState} from "../../app/services/apiSplice.ts";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";


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

const OperatorModal = ({ open, setOpen, value }:any ) => {

    const lineParams = useAppSelector(state => state.line)

     const {shift, operators} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            shift: state? state['shift'][0] : undefined,
            operators: state ? state['shift'][0] ? state['shift'][0]['operators'] : undefined : undefined,
        })
    })

    const handleClose = () => setOpen(false);
    const [operatorData, setOperatorData] = useState([])
    const [selected, setSelected] = useState<number[]>([0]);

    // GET OPERATORS
    useEffect(() => {
        getOperators()
        if (operators !== undefined) {
            setSelected(operators)
        }
    }, [shift])

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    const getOperators = async () => {
        try {
            const response = await instance.get('/operator/')
            const data = await response.data
            setOperatorData(data)

        } catch (error) {
            // @ts-ignore
            if (error.name === 'TypeError') {
                const data: React.SetStateAction<never[]> = []
                setOperatorData(data)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let s = [...selected]
        const id = Number(e.currentTarget.value)

        if (!_.includes(s, id)){
           s = _.concat(s, id)
        } else {
           _.pull(s, id)
        }
        setSelected(s)

        axios.put(`http://127.0.0.1:8000/api/shift/${shift?.id}/`, {
            date: shift?.date,
            operators: s,
        })
        .then(function (_response) {
          //console.log(response);
        })
        .catch(function (_error) {
          //console.log(error);
        });

    }


    return(
        <>
            <Modal
              open={open && value===0}
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
                        <Grid spacing={5}>
                            <Typography color='black' id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
                                Operators
                            </Typography>
                        </Grid>
                        <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                        <Grid xs={12} sx={{overflow: 'auto', maxHeight: 300,}}>
                            <FormControl id="modal-modal-description" sx={{ mt: 2, marginLeft: 5 }} component="fieldset" variant="standard">
                                <FormGroup>
                                    {operatorData.map((operator:any) => (
                                        <FormControlLabel
                                            key={operator.id}
                                            style={{color:'black'}}
                                            control={
                                            <Checkbox
                                                onChange={handleChange}
                                                value={operator.id}
                                                checked={_.includes(selected, operator.id)}
                                            />
                                        }
                                            label={`#${operator.worker_number} | ${operator.last_name}, ${operator.first_name}`}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
            </Modal>
        </>
    )
}

export default OperatorModal;