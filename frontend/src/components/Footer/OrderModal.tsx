import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {Button, Container, InputAdornment, MenuItem, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import {
    useGetAllProductsQuery,
    useGetLineState,
    useOrderAddedMutation,
    useProductUpdatedMutation,
    useQuantityUpdatedMutation,
    useShiftAddedMutation,
} from "../../app/services/apiSplice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import Box from "@mui/material/Box";


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

export interface product {
    id: number,
    part_num: string,
    rate: number
}

const CommentModal = ({ open, setOpen, value }:any) => {

    const handleClose = () => {
        setOpen(false)
    };

    const {data:products} = useGetAllProductsQuery();

    const lineParams = useAppSelector(state => state.line)

     const {shift, order, product, lineID} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            lineID: state ? state.id : undefined,
            shift: state? state['shift'][0] : undefined,
            order: state? state['shift'][0]? state['shift'][0]['order'][0] : undefined : undefined,
            product: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
        })
    })

    const [updateQuantity] = useQuantityUpdatedMutation();
    const [updateProduct] = useProductUpdatedMutation();
    const [addOrder] = useOrderAddedMutation();
    const [addShift] = useShiftAddedMutation();

    const handleProductChange = (event:any) => {
       if (order){
           updateProduct({
               ...order,
               product: event.target.value
           })
       } else {
           addOrder({
               product: event.target.value,
               line: shift?.line,
               shift: shift?.id
           })
       }
    }

    return(
        <>
            <Modal
              open={open && value===1}
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
                                Order
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" orientation={'horizontal'} flexItem={true} sx={{bgcolor:'black'}}/>
                    <Grid xs={12}>
                        <Box
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                             <Box component={'div'} py={2} display={!shift ? 'block' : 'none'}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color={'info'}
                                    onClick={() => addShift({
                                        number: lineParams.number,
                                        date: lineParams.date,
                                        line: lineID,
                                    })}
                                >
                                    Create Shift
                                </Button>
                            </Box>
                            <div>
                                <TextField
                                    id="product"
                                    select
                                    fullWidth
                                    label="Select product"
                                    defaultValue={ product ? product.toString() : '1'}
                                    helperText="Select product being made"
                                    sx={{mt:'20px'}}
                                    onChange={(event) => handleProductChange(event)}
                                >
                                    {products?.map((option:product) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.part_num}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                  id="quantity"
                                  fullWidth
                                  label="Select quantity"
                                  defaultValue={order?.quantity}
                                  helperText="Enter quantity"
                                  sx={{mt:'30px'}}
                                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                  onChange={(event) => updateQuantity({
                                      ...order,
                                      quantity: event.target.value
                                  })}
                                  InputProps={{
                                      endAdornment: <InputAdornment position="end">pcs</InputAdornment>,
                                  }}
                                />
                          </div>
                        </Box>
                    </Grid>
                </Grid>
                </Container>
            </Modal>
        </>
    )
};

export default CommentModal;