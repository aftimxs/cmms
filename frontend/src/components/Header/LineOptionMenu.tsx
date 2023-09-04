import Modal from 'react-bootstrap/Modal';
import {Accordion, ButtonGroup} from 'react-bootstrap'
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import _ from 'lodash';


// @ts-ignore
const LineOptionMenu = ({title, visibilityPL, lineSelector}) => {

    let linesByArea = _.groupBy(lineSelector.lines, 'area')

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
                                {linesByArea.Welding.map((line:any) => (
                                    <button key={line.id}
                                            type="button"
                                            className={lineSelector.isButtonSelected([line.id, line.number, line.area]) ? "list-group-item list-group-item-action py-1 active" : "list-group-item list-group-item-action py-1"}
                                            value={[line.id, line.number,line.area]}
                                            onClick={lineSelector.handlePL}
                                    >
                                        {`${line.area} ${line.number}`}
                                    </button>
                                ))}
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey='1'>
                            <AccordionHeader>Molding</AccordionHeader>
                            <AccordionBody>
                                {linesByArea.Molding.map((line:any) => (
                                      <button key={line.id}
                                              type="button"
                                              className={lineSelector.isButtonSelected([line.id, line.number, line.area]) ? "list-group-item list-group-item-action py-1 active" : "list-group-item list-group-item-action py-1"}
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