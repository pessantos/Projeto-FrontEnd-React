import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
import { Container } from '@material-ui/core';

interface Itask {
    nome: string;
    cpf: string
}

const Tasks: React.FC = () => {

    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Itask>({
        nome: '',
        cpf: '',

    });

    useEffect(() => {
        if (id !== undefined) {
            findFunc(id)
        }
    }, [id]);

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            const response = await api.put(`/funcionario/${id}`, model)
        }else{
            const response = await api.post('/funcionario', model)
        }
        back()
    }

    async function findFunc(id: string) {
        const response = await api.get(`funcionario/${id}`)
        setModel({
            nome: response.data.nome,
            cpf: response.data.cpf
        })
    }

    function back() {
        history.goBack()
    }

    return (

        <>
            <div className="task-header">
                <h1>Cadastro Funcionários</h1>
                <Button variant="outline-primary" onClick={back}>Voltar</Button>
            </div>
    
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome Completo"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CPF"
                            name="cpf"
                            value={model.cpf}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            required
                        />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">
                        Salvar
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default Tasks;