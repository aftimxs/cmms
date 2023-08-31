
const TimelineBar = ({bg}:any) => {
    return(
        <div className={`d-inline-block h-100 position-relative ${bg}`} style={{width:'1.667%'}}>
            <span className={bg === 'bg-success' ? `position-absolute top-100 start-100 translate-middle badge border border-2
                border-light rounded-circle bg-dark p-1` : 'visually-hidden'}
                  style={{zIndex:1}}><span className="visually-hidden">x</span></span>
        </div>
    )
};

export default TimelineBar;