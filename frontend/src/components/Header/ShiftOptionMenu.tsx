import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CalendarPicker from "./CalendarPicker.tsx";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {numberAdded} from "../../features/lineParamsSlice.ts";


const ShiftOptionMenu = ({ visibility }:any) => {

    const dispatch = useAppDispatch()
    const lineParams = useAppSelector(state => state.line)

    const radios = [
        {id:'1', title:'First Shift'},
        {id:'2', title:'Second Shift'}
    ]

    const isRadioSelected = (value2:string): boolean => lineParams.number === value2;
    const handleRadio = (e:React.ChangeEvent<HTMLInputElement>) => dispatch(numberAdded(e.currentTarget.value))

    return(
         <>
          <Modal show={visibility.show} onHide={visibility.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select date and shift</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid text-center py-3">
                    <CalendarPicker/>
                </div>
                <div className="container-fluid py-3">
                    <Form>
                        <div className="row text-center">
                        {radios.map((radio) => (
                            <div key={radio.id} className="col-6">
                                <Form.Check
                                    inline
                                    type='radio'
                                    name="shiftSelector"
                                    label={radio.title}
                                    value={radio.id}
                                    checked={isRadioSelected(radio.id)}
                                    onChange={handleRadio}
                                />
                            </div>
                        ))}
                            </div>
                    </Form>
                </div>
            </Modal.Body>
          </Modal>
        </>
    )
};

export default ShiftOptionMenu;