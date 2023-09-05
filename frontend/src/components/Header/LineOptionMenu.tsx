import Modal from 'react-bootstrap/Modal';
import {Accordion, Button, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import _ from 'lodash';
import {useState} from "react";


// @ts-ignore
const LineOptionMenu = ({title, visibilityPL, lineSelector}) => {

    let linesByArea = _.groupBy(lineSelector.lines, 'area')
    //const [radioValue, setRadioValue] = useState({id: '1', number: '1', area: 'Welding'});

    return(
         <>
          <Modal show={visibilityPL.showPL} onHide={visibilityPL.handleClosePL}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid py-3">
                    <Accordion>
                        <AccordionItem eventKey='0'>
                            <AccordionHeader>Welding</AccordionHeader>
                            <AccordionBody>
                                <ToggleButtonGroup type={"radio"} name="lineOptions">
                                    {linesByArea.Welding.map((line:any) => (
                                        <ToggleButton
                                            key={line.id}
                                            id={line.id}
                                            type={'radio'}
                                            value={[line.id, line.number, line.area]}
                                            checked={lineSelector.production[0].id === line.id}
                                            onChange={lineSelector.handlePL}
                                        >
                                            {`${line.area} ${line.number}`}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey='1'>
                            <AccordionHeader>Molding</AccordionHeader>
                            <AccordionBody>
                                {linesByArea.Molding.map((line:any) => (
                                      <button key={line.id}
                                              type="button"
                                              className={lineSelector.isButtonSelected(line.id) ? "list-group-item list-group-item-action py-1 active" : "list-group-item list-group-item-action py-1"}
                                              value={[line.id, line.number,line.area]}
                                              onClick={lineSelector.handlePL}
                                      >
                                          {`${line.area} ${line.number}`}

                                      </button>
                                ))}
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                    <div className="list-group">

                    </div>
                </div>
            </Modal.Body>
          </Modal>
        </>
    )
};

export default LineOptionMenu;