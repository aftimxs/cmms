import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";
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


const CommentModal = ({ open, setOpen, data }:any) => {

    const handleClose = () => setOpen(false);

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
                </Box>
            </Modal>
        </>
    )
};

export default CommentModal;