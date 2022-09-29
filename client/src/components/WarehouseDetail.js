import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function WarehouseDetail() {

    const [inventoryList, setInventoryList] = useState([]);
    const [inventoryName, setInventoryName] = useState('');

    const [newName, setNewName] = useState('');

    const { id } = useParams();

    const fetchData = () => {
        axios.get('http://localhost:3001/inventory').then((response) => {
            setInventoryList(response.data)
        })
    }

    useEffect(() => {
        fetchData()
    }, [inventoryName])

    const filtered = inventoryList.filter(val => val.id === Number(id))

    const handleSubmit = () => {
        axios.post(`http://localhost:3001/inventory`, {
            wareHouseId: id,
            inventoryName: inventoryName
        }).then(() => {
            setInventoryList([...inventoryList, { wareHouseId: id, inventoryName: inventoryName }])
            setInventoryName('')
        })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/inventory/${id}`)
        fetchData()
    }

    const handleUpdate = (id) => {
        axios.put(`http://localhost:3001/inventory/${id}`, {
            inventoryName: newName
        });
        setNewName('');
        fetchData()
    }

    return (

        <div className='inventory'>
            <div>
                <h2>Inventory List</h2>
                <div>
                    <input type='text' className='input' value={inventoryName} onChange={(e) => setInventoryName(e.target.value)} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            {filtered.map((val, idx) => {
                return (
                    <>
                        <div className='card' key={idx}>
                            <p>Inventory Name: {val.inventoryName}</p>
                            <div>
                                <button onClick={() => handleDelete(val.inventoryId)}>Delete</button>
                                <input className='input' type='text' onChange={(e) => setNewName(e.target.value)} />
                                <button onClick={() => handleUpdate(val.inventoryId)}>Update</button>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default WarehouseDetail