import React, { useState, useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

interface Itask {
    id: number;
    nome: string;
    descricao: string
}


const Categorias: React.FC = () => {

    const [categorias, setCategorias] = useState<Itask[]>([]);
  
    const history = useHistory();

    useEffect(() => {
        loadCategorias()
    }, [])

    async function loadCategorias() {

        const response = await api.get('/categoria')
        console.log(response)
        setCategorias(response.data)
    }

    function newCategoria(){
        history.push('/cadcategoria')
    }

    function editCategoria(id: number){
        history.push(`/categoria/${id}`)
    }

    async function deleteCategoria(id: number){
        if (await api.delete(`/categoria/${id}`)){
            alert("Deletado com Sucesso");
        }else{
            alert("Campo com dependencias, não é possivel deletar");
        }
        loadCategorias()
        
    }

    return (

        <>

            <div className="task-header">
            <h1>Categorias</h1>
            <Button variant="outline-primary" onClick={newCategoria}>Nova Categoria</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descricao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        categorias.map(categorias => (
                            <tr key={categorias.id}>
                                <td>{categorias.id}</td>
                                <td>{categorias.nome}</td>
                                <td>{categorias.descricao}</td>
                                <td>
                                    <Button size="sm" variant="outline-primary" onClick={()=> editCategoria(categorias.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="outline-danger" onClick={()=> deleteCategoria(categorias.id)} >Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Categorias;