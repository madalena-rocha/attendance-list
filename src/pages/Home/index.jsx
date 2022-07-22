import React, { useState, useEffect } from 'react'; // useState é o hook que permite a criação de estados
/* Hooks são funções que permitem conectar os recursos de estado e ciclo de vida do React a partir de componentes totalmente funcionais
  Normalmente os Hooks iniciam com a palavra use por convenção.
*/

import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
  /*
    Como armazenar e recuperar valores do estado

    Diferença do estado para uma variável comum:
      - para utilizar o conteúdo de uma variável para refletir na interface o novo conteúdo, é necessário usar estado
      - o estado, toda vez que muda, vai gerar uma nova renderização da interface
  */

  const [studentName, setStudentName] = useState('');
  /*
    - um estado tem dois elementos, onde será guardado o conteúdo do estado, e a função que atualiza esse estado
    - o nome da função por padrão começa com set seguido do nome do estado
    - o valor passado dentro da função useState() é o valor inicial do estado
  */

  const [students, setStudents] = useState([]); // armazenar os estudantes da lista de presença
  
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent(){
    const newStudent = { // o estudante precisa de duas informações, o nome e o horário que ele entrou na listagem
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    // recuperar os estudantes que já estavam no estado antes, criar um novo vetor juntando o que tinha antes na lista e adicionando o novo estudante
    setStudents(prevState => [...prevState, newStudent]); // adicionando o novo estudante ao estado setStudents
    // Necessário colocar ... no prevState para tirar o conteúdo do estado anterior de dentro do vetor e despejar dentro do novo vetor
  }

  /*
  useEffect(() => { // o useEffect é executado automaticamente assim que a interface é renderizada
    // corpo do useEffect: dentro do corpo estão as ações a serem executadas
    fetch('https://api.github.com/users/madalena-rocha')
    .then(response => response.json())
    .then(data => {
      setUser({ // salvando as informações que a url entregou dentro do estado de user
        name: data.name,
        avatar: data.avatar_url,
      });
    });
  },[]) /* array de dependências: serve para colocar os estados que o useEffect depende
      caso o array de dependências esteja vazio, o userEffect será executado uma única vez no carregamento da tela
      se dentro do array de dependências tiver um estado como dependência, toda vez que o estado for atualizado, o useEffect será executado também */
  
  /*
    Como lidar com requisições assíncronas dentro do userEffect
    - o useEffect não aceita ser assíncrono como conseguimos numa função
    - para ser assíncrono, podemos criar uma função dentro do useEffect, utilizar o async/await na função e chamar a função
  */

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/madalena-rocha');
      const data = await response.json();
      console.log("DADOS ===> ", data);

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData()
  }, []);

  return (
    /*
      As expressões JSX devem ter um único elemento filho
      Elementos JSX devem ser embrulhados em uma tag delimitadora
      Fragmento JSX <>...</>, <div>...</div> ou qualquer outra tag
    */
    
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite o nome..." 
        onChange={e => setStudentName(e.target.value)}
        // toda vez que o conteúdo do input muda, entrega um evento, e dentro desse evento, acessa o valor atual dentro do input, passando esse valor para o setStudentName
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
        <Card 
          // Quando temos componentes gerados a partir de uma estrutura de repetição, utilizar chave única para cada componente
          key={student.time} // geralmente utiliza-se o id
          name={student.name} 
          time={student.time} 
        />
        ))
      }
    </div>
  )
  /*
    Componentização:
    - componente <Card /> criado uma única vez
    - reaproveitamento do componente <Card />
    - para passar valor numérico no <Card />, não é necessário utilizar aspas. Ex.: idade={18}
    - cada componente está sendo renderizado de acordo com as propriedades passadas para cada um
  */

  /*
    - percorrer cada estudante da lista
    - envolver com {} para utilizar o conteúdo do estado
    - a variável auxiliar student vai armazenar o estudante atual a cada iteração
    - para cada estudante, renderizar um card
  */
}