import Modal from "@mui/material/Modal";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {Container, InputAdornment, MenuItem, TextField} from "@mui/material";
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
    useGetAllProductsQuery,
    useGetDowntimeQuery,
    useGetLineQuery,
    useGetLineState,
    useLazyGetDowntimeQuery,
    useLazyGetScrapQuery, useProductUpdatedMutation,
    useQuantityUpdatedMutation,
    useScrapAddedMutation,
    useScrapDeletedMutation,
    useScrapUpdatedMutation
} from "../../app/services/apiSplice.ts";
import CommentButton from "./CommentButton.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {request} from "axios";
import {QueryResultSelectorResult} from "@reduxjs/toolkit/dist/query/core/buildSelectors";
import ScrapButton from "./ScrapButton.tsx";
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

     const {order, product} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            order: state? state['shift'][0]? state['shift'][0]['order'][0] : undefined : undefined,
            product: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
        })
    })

    const [updateQuantity] = useQuantityUpdatedMutation();
    const [updateProduct] = useProductUpdatedMutation();

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
                            <div>
                                <TextField
                                    id="product"
                                    select
                                    fullWidth
                                    label="Select product"
                                    defaultValue={ product ? product.toString() : '1'}
                                    helperText="Select product being made"
                                    sx={{mt:'20px'}}
                                    onChange={(event) => updateProduct({
                                      ...order,
                                      product: event.target.value
                                  })}
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