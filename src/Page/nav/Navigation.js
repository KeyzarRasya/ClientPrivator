import './navigation.css'

function Navigation({list:{one, two, three}}){
    return(
        <div className='navi'>
            <div className='logo'></div>
            <p style={{color: '#9BBEC8'}}>PRIVATOR</p>
            <ul>
               <li><a href="#scan">{one}</a></li>
               <li><a href="">{two}</a></li>
               <li><a href="">{three}</a></li>
            </ul>
        </div>
    )
}

export default Navigation;