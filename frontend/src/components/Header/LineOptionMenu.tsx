import Modal from 'react-bootstrap/Modal';


// @ts-ignore
const LineOptionMenu = ({title, visibilityPL, lineSelector}) => {
    return(
         <>
          <Modal show={visibilityPL.showPL} onHide={visibilityPL.handleClosePL}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid py-3">
                    <div className="list-group">
                        {lineSelector.lines.map((line) => (
                              <button key={line.id}
                                      type="button"
                                      className={lineSelector.isButtonSelected([line.id, line.number, line.area]) ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                      value={[line.id, line.number,line.area]}
                                      onClick={lineSelector.handlePL}
                              >
                                  {`${line.area} ${line.number}`}
                              </button>
                        ))}
                    </div>
                </div>
            </Modal.Body>
          </Modal>
        </>
    )
};

export default LineOptionMenu;