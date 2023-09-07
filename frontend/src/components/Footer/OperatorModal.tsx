import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";



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

const OperatorModal = ({ open, setOpen, data }) => {

    const handleClose = () => setOpen(false);
    const [operatorData, setoperatorData] = useState([])

    // GET OPERATORS
    useEffect(() => {
        getOperators()
    }, [])

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    const getOperators = async () => {
        try {
            const response = await instance.get('/operator/')
            const data = await response.data
            setoperatorData(data)

        } catch (error) {
            if (error.name === 'TypeError') {
                const data: React.SetStateAction<never[]> = []
                setoperatorData(data)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(data.shiftData.on_line)
        const newOperatorData = operatorData.map((operator:any) => {
            if (operator.id !== e.currentTarget.value) {
                return operator;
            } else {
                return {
                    ...operator,
                    working_line: 1,
                    working_shift: data.shiftData.shift_number,
                };
            }
        });
        console.log(newOperatorData)
        setoperatorData(newOperatorData)
    }

    console.log(operatorData)

    return(
        <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography color='black' id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
                        Operators
                    </Typography>

                        <FormControl id="modal-modal-description" sx={{ mt: 2 }} component="fieldset" variant="standard">
                            <FormGroup>
                                {operatorData.map((operator:any) => (
                                    <FormControlLabel
                                        key={operator.id}
                                        control={
                                        <Checkbox onChange={handleChange} value={operator.id} />
                                    }
                                        label={`${operator.first_name} ${operator.last_name}`}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>

                </Box>
            </Modal>
        </>
    )
}

export default OperatorModal;