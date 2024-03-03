import './loader.css'
import {ReactTyped} from "react-typed";

const Loader = () => {
    return (
        <div className='loader-container d-flex align-items-center justify-content-center bg-black min-vw-100 min-vh-100 flex-column g-5'>
            <h1 className='loader-heading'>
                <ReactTyped
                    strings = {["TechTrove"]}
                    typeSpeed={150}
                    loop
                    backSpeed={100}
                    cursorChar="|"
                    showCursor={true}
                />
            </h1>
            <div className='loader '></div>
        </div>
    )
}

export default Loader