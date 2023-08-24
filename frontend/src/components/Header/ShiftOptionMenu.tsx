import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CalendarPicker from "./CalendarPicker.tsx";
import dayjs from "dayjs";

interface Props{
    show: boolean;
    handleClose: () => void;
    title: string;
    value: dayjs.Dayjs;
    handleDate: () => void;
}

const ShiftOptionMenu = ({show, handleClose, title, value, handleDate}:Props) => {
    return(
         <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid text-center py-3">
                    <CalendarPicker value={value} handleDate={handleDate}/>
                </div>
                <div className="container-fluid py-3">
                    <Form>
                        <div className="row text-center">
                        {['First Shift', 'Second Shift'].map((shift, index) => (
                            <div key={index} className="col-6">
                                <Form.Check
                                    inline
                                    type='radio'
                                    name="shiftSelector"
                                    label={shift}
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