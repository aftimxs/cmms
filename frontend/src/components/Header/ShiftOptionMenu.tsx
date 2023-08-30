import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CalendarPicker from "./CalendarPicker.tsx";


const ShiftOptionMenu = ({title, visibility, date, shiftSelector}:any) => {

    const radios = [
        {id:'1', title:'First Shift'},
        {id:'2', title:'Second Shift'}
    ]

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
                        {radios.map((radio) => (
                            <div key={radio.id} className="col-6">
                                <Form.Check
                                    inline
                                    type='radio'
                                    name="shiftSelector"
                                    label={radio.title}
                                    value={radio.id}
                                    checked={shiftSelector.isRadioSelected(radio.id)}
                                    onChange={shiftSelector.handleRadio}
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