import React, { useState, useEffect } from 'react'; // useState é o hook que permite a criação de estados
import './styles.css';
import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {

  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]); // armazenar os estudantes da lista de presença
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent(){
    const newStudent = { // o estudante precisa de duas informações, o nome e o horário que ele entrou na listagem
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    // recuperar os estudantes que já estavam no estado antes, criar um novo vetor juntando o que tinha antes na lista e adicionar o novo estudante ao estado setStudents
    setStudents(prevState => [...prevState, newStudent]);
    // necessário colocar ... no prevState para tirar o conteúdo do estado anterior de dentro do vetor e despejar dentro do novo vetor
  }

  useEffect(() => { // o useEffect é executado automaticamente assim que a interface é renderizada
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/madalena-rocha');
      const data = await response.json() as ProfileResponse;
      console.log("DADOS ===> ", data);

      setUser({ // salvando as informações que a url entregou dentro do estado de user
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData()
  }, []); // array de dependências vazio: o userEffect será executado uma única vez no carregamento da tela

  return (
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
          // quando temos componentes gerados a partir de uma estrutura de repetição, utilizar chave única para cada componente
          key={student.time}
          name={student.name} 
          time={student.time} 
        />
        ))
      }
    </div>
  )
}