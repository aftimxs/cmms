import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


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


const CommentModal = ({ open, setOpen, info }:any) => {

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
                        {info.start} - {info.end}
                        <br></br>
                        {info.reason ? info.reason : 'Uncommented'}
                    </Typography>
                     <Typography color='black' id="modal-modal-description" textAlign='center'>
                         {info.description ? info.description : "No description"}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
};

export default CommentModal;