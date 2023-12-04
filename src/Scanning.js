import Navigation from "./Page/nav/Navigation";
import Scan from "./component/scan/Scan";

function Scanning(){
    return(
        <div>
            <Navigation list={{one:'Scan', two:'How to Use', three:'Log In'}}/>
            <Scan/>
        </div>
    )
}

export default Scanning;