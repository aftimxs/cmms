
const TimelineBar = ({bg}:any) => {

    let w = bg.long * 1.6665

    return(
        <div className={`d-inline-block h-100 position-relative ${bg.bg}`} style={{width:`${w}%`}}>
            <span className={bg === 'bg-success' ? `position-absolute top-100 start-100 translate-middle badge border border-2
                border-light rounded-circle bg-dark p-1` : 'visually-hidden'}
                  style={{zIndex:1}}><span className="visually-hidden">x</span></span>
        </div>
    )
};

export default TimelineBar;