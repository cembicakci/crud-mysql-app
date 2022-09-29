import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Warehouse(props) {

    const [wareHouseName, setWareHouseName] = useState('');
    const [wareHouseList, setWareHouseList] = useState([]);

    function dataMethod() {
        this.props.sendData(wareHouseName)
    }

    const [newName, setNewName] = useState('');

    const fetchData = () => {
        axios.get('http://localhost:3001/wareHouses').then((response) => {
            setWareHouseList(response.data);
        })
    }


    useEffect(() => {
        fetchData()
    }, [wareHouseName])

    const handleSubmit = () => {
        axios.post('http://localhost:3001/wareHouses', {
            wareHouseName: wareHouseName
        }).then(() => {
            setWareHouseList([...wareHouseList, { wareHouseName: wareHouseName }])
        })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/wareHouses/${id}`)
        fetchData();
    }

    const handleUpdate = (id) => {

        axios.put(`http://localhost:3001/wareHouses/${id}`, {
            wareHouseName: newName
        });
        setNewName('');
        fetchData();
    }

    return (
        <div className="App">

            <h1>Warehouse App</h1>

            <div>
                <label>Warehouse Name: </label>
                <input type='text' name='wareHouseName' className='input' onChange={(e) => setWareHouseName(e.target.value)} />

                <button onClick={handleSubmit}>Submit</button>
            </div>



            {wareHouseList.map((val, idx) => {
                return (
                    <div key={idx} className='card'>
                        <Link className='card-name' to={`/warehouse/${val.id}`}>
                            <a>WareHouseName: {val.wareHouseName}</a>
                        </Link>

                        <div>
                            <button onClick={() => handleDelete(val.id)}>Delete</button>
                            <input className='input' type='text' onChange={(e) => setNewName(e.target.value)} />
                            <button onClick={() => handleUpdate(val.id)}>Update</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Warehouse