
import './index.css'
import Navigation from './Page/nav/Navigation'
import Description from './Page/desc/Description';
import Scan from './component/scan/Scan';

function Main(){

    return(
        <div>
            <Navigation list={{one:'Scan', two:'How to Use', three:'Log In'}}/>
            <Description/>
            <Scan/>
        </div>
    )
}

export default Main