import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import '../Clientes/styles.css'
import moment from 'moment'

// import { Container } from './styles';

interface Itask {
    id: number;
    nome: string;
    usuario: string;
    cpf: string;
    dataNascimento: Date;
    email: string;
    //  endereco:string
}


const Clientes: React.FC = () => {

    const [clientes, setClientes] = useState<Itask[]>([]);

    const history = useHistory();

    useEffect(() => {
        loadClientes()
    }, [])

    async function loadClientes() {

        const response = await api.get('/cliente');
        console.log(response)
        setClientes(response.data);
    }

    function newCliente() {
        history.push('/cadcliente');
    }

    function editCliente(id: number) {
        history.push(`/cliente/${id}`);
    }
    
    async function deleteCliente(id: number) {
        await api.delete(`/cliente/${id}`);
        loadClientes();

    }

    function formatDate(date: Date){ 
        return moment(date).format("DD/MM/YYYY");
    }

    return (

        <>
            <div className="task-header">
                <h1>Clientes</h1>
                <Button variant="outline-primary" onClick={newCliente}>Novo Cliente</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Uuario</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th>E-mail</th>

                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        clientes.map(clientes => (
                            <tr key={clientes.id}>
                                <td>{clientes.id}</td>
                                <td>{clientes.nome}</td>
                                <td>{clientes.usuario}</td>
                                <td>{clientes.cpf}</td>
                                <td>{formatDate(clientes.dataNascimento)}</td>
                                <td>{clientes.email}</td>
                                <td>
                                    <Button id="action-button" size="sm" variant="outline-info" onClick={() => editCliente(clientes.id)}>Detalhes</Button>{' '}
                                    <Button size="sm" variant="outline-primary" onClick={() => editCliente(clientes.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="outline-danger" onClick={() => deleteCliente(clientes.id)} >Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Clientes;