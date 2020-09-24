import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

interface Ifuncionario {
    id: number;
    nome: string;
    cpf: string
}


const Tasks: React.FC = () => {

    const [funcionario, setFuncionario] = useState<Ifuncionario[]>([]);
  
    const history = useHistory();

    useEffect(() => {
        loadFuncionario()
    }, [])

    async function loadFuncionario() {

        const response = await api.get('/funcionario')
        console.log(response)
        setFuncionario(response.data)
    }

    function newFunc(){
        history.push('/cadfuncionario')
    }

    function editFunc(id: number){
        history.push(`/funcionario/${id}`)
    }

    async function deleteFunc(id: number){
        await api.delete(`/funcionario/${id}`)
        loadFuncionario();
    }

    return (

        <>
            <div className="task-header">
            <h1>Funcionários</h1>
            <Button variant="outline-primary" onClick={newFunc}>Novo Funcionário</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        funcionario.map(funcionario => (
                            <tr key={funcionario.id}>
                                <td>{funcionario.id}</td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.cpf}</td>
                                <td>
                                    <Button size="sm" variant="outline-primary" onClick={()=> editFunc(funcionario.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="outline-danger" onClick={()=> deleteFunc(funcionario.id)} >Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Tasks;