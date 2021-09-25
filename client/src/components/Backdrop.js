import './Backdrop.css'
const Backdrop = ({show, click }) => {
    // if show is true >>do this
    return show && <div className="backdrop" onClick={click}>
            
        </div>
    
}

export default Backdrop
