import './styles.css';

export function Card(props) { // acessando as propriedades através do props
    return (
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}