import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CalendarPicker from "./CalendarPicker.tsx";


// @ts-ignore
const ShiftOptionMenu = ({title, visibility, date, shiftSelector}) => {
    return(
         <>
          <Modal show={visibility.show} onHide={visibility.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid text-center py-3">
                    <CalendarPicker
                        date = {date}
                    />
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
                                    value={index}
                                    onChange={value => shiftSelector.setShiftSelect(value)}
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