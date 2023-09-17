import Modal from 'react-bootstrap/Modal';
import {Accordion, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import _ from 'lodash';
import {areaAdded, cellAdded} from "../../features/lineParamsSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";



// @ts-ignore
const LineOptionMenu = ({title, visibility}) => {

    const dispatch = useAppDispatch()

    const handlePL = (e: { currentTarget: { value: string; }; }): void => {
            const eSplit = e.currentTarget.value.split(",");
            dispatch(cellAdded(eSplit[1]))
            dispatch(areaAdded(eSplit[2]))
    }

    const lines = [
        {id:'1', number:'1', area:'Welding'},
        {id:'2', number:'10', area:'Welding'},
        {id:'3', number:'11', area:'Welding'},
        {id:'4', number:'1', area:'Molding'},
        {id:'5', number:'2', area:'Molding'},
        {id:'6', number:'3', area:'Molding'},
        {id:'7', number:'4', area:'Molding'},
        {id:'8', number:'5', area:'Molding'},
    ]

    let linesByArea = _.groupBy(lines, 'area')

    return(
         <>
          <Modal show={visibility.showPL} onHide={visibility.handleClosePL}>
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
                                            // checked={}
                                            onChange={handlePL}
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
                                              // className={}
                                              value={[line.id, line.number,line.area]}
                                              onClick={handlePL}
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