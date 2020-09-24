import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import api from '../../../services/api';
import './styles.css';
import { Categoria } from '../../Categorias/types'
import { Funcionario } from '../../Funcionarios/types'
import { Container } from '@material-ui/core';

interface Iprod {
    nome: string;
    descricao: string;
    qtdEstoque: number;
    valor: number;
    id_funcionario: string;
    id_categoria: string;
    dataFabricacao: string;
}

const Produtos: React.FC = () => {

    //type categoria
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        loadCategoria()
    }, [])

    async function loadCategoria() {

        const response = await api.get('/categoria')
        console.log(response)
        setCategorias(response.data)
    }

    //type funcionario

    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

    useEffect(() => {
        loadFuncionario()
    }, [])

    async function loadFuncionario() {

        const response = await api.get('/funcionario')
        console.log(response)
        setFuncionarios(response.data)
    }

    // form produto
    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Iprod>({
        nome: '',
        descricao: '',
        qtdEstoque: 0,
        valor: 0,
        id_funcionario: '',
        id_categoria: '',
        dataFabricacao: '',

    });

    useEffect(() => {
        if (id !== undefined) {
            findProd(id)
        }
    }, [id]);

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target)
        console.log(e.target.value)
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(model)
        if (id !== undefined) {
            const response = await api.put(`/produto/${id}`, model)
        } else {
            const response = await api.post('/produto', model)
        }
        back()
    }

    async function findProd(id: string) {
        const response = await api.get(`produto/${id}`)

        setModel({
            nome: response.data.nome,
            descricao: response.data.descricao,
            qtdEstoque: response.data.qtdEstoque,
            valor: response.data.valor,
            id_funcionario: response.data.id_funcionario,
            id_categoria: response.data.id_categoria,
            dataFabricacao: response.data.dataFabricacao,
        });
    }
    function back() {
        history.goBack()
    }


    return (

        <>
            <div className="task-header">
                <h1>Cadastro de Produtos</h1>
                <Button variant="outline-primary" onClick={back}>Voltar</Button>
            </div>
            <br />
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome Produto" name="nome" value={model.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" placeholder="Descrição" name="descricao" value={model.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Estoque</Form.Label>
                                <Form.Control type="number" placeholder="Estoque" name="qtdEstoque" value={model.qtdEstoque} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                            </Col>
                            <Col>
                                <Form.Label>Valor</Form.Label>
                                <Form.Control type="number" placeholder="Valor Unitario" name="valor" value={model.valor} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                            </Col>
                            <Col>
                                <Form.Label>Data de Fabricação</Form.Label>
                                <Form.Control type="text" placeholder="YYYY-MM-DDT00:00:00Z" name="dataFabricacao" defaultValue={model.dataFabricacao} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Nome Funcionario</Form.Label>
                                <Form.Control as="select" placeholder="Funcionario" name="id_funcionario" value={model.id_funcionario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required>
                                    {funcionarios.map((funcionario, index) => (<option key={funcionario.nome} value={funcionario.id}>{funcionario.nome}</option>))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label id="categoria-options">Nome Categoria</Form.Label>
                                <Form.Control as="select" placeholder="Categoria" name="id_categoria" value={model.id_categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required>
                                    {categorias.map((categoria, index) => (<option key={categoria.nome} value={categoria.id}>{categoria.nome}</option>))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit">
                        Salvar
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default Produtos;