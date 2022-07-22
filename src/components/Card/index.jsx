import './styles.css';

// o React é baseado em componentização, estratégia para reaproveitar código, facilitar manutenção e organizar a aplicação

/*
    Desestruturando o props:
    - function Card({ name, time })
    - <strong>{name}</strong>
    - <small>{time}</small>
*/
export function Card(props) { // acessando as propriedades através de props
    return (
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}

/*
    Imutabilidade
    - é o princípio que os estados do React respeitam
    - faz parte do paradigma da programação funcional
    - diz que o conteúdo não deve ser alterado, mas sim substituído, porque é mais performático
    - por isso temos uma função para atualizar o conteúdo do estado, e não atualizamos o estado diretamente
*/