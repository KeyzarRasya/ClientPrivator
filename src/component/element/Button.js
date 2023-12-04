import './button.css'

function Button({buttonText, onClick, disabled, style}){
    return(
        <button color={style} onClick={onClick} disabled={disabled} >{buttonText}</button>
    )
}

export default Button