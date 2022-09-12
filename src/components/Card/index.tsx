import './styles.css';

export type CardProps = {
    name: string;
    time: string;
}

export function Card(props: CardProps) { // acessando as propriedades através do props
    return (
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}