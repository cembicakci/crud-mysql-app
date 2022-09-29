const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'warehouse'
})

db.connect();

app.use(cors())
app.use(express.json())

app.post('/wareHouses', (req, res) => {

    //req is the variable that we are passing as a parameter
    const wareHouseName = req.body.wareHouseName;

    const sqlInsert = "INSERT INTO wareHouses(wareHouseName) VALUES (?)";
    db.query(sqlInsert, [wareHouseName], (err, result) => {
        res.send(result)
    })
})


// warehouses 
app.get('/wareHouses', (req, res) => {

    const sqlSelect = 'SELECT * FROM wareHouses';

    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.delete('/wareHouses/:id', (req, res) =>{

    const id = req.params.id;

    const sqlDelete = "DELETE FROM wareHouses WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
        if(err) console.log(err)
    })
})

app.put('/wareHouses/:id', (req, res) =>{

    const id = req.params.id;
    const name = req.body.wareHouseName;

    const sqlUpdate = "UPDATE wareHouses SET wareHouseName = ? WHERE id = ?";
    db.query(sqlUpdate, [name, id], (err, result) => {
        if(err) console.log(err)
    })
})


// inventory
app.get('/inventory', (req, res) => {

    const sqlSelect = 'SELECT * FROM inventory INNER JOIN wareHouses ON wareHouses.id = inventory.wareHouseId ;';

    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/inventory', (req, res) => {

    const inventoryName = req.body.inventoryName;
    const wareHouseId = req.body.wareHouseId;

    const sqlInsertInventory = "INSERT INTO inventory(wareHouseId, inventoryName) VALUES (?, ?)";
    db.query(sqlInsertInventory, [wareHouseId, inventoryName], (err, result) => {
        res.send(result)
    })
})

app.delete('/inventory/:id', (req, res) => {

    const inventoryId = req.params.id
    
    const sqlDeleteInventory = "DELETE FROM inventory WHERE inventoryId = ?";
    db.query(sqlDeleteInventory, [inventoryId], (err, result) => {
        if(err) console.log(err)
    })
})

app.put('/inventory/:id', (req, res) =>{

    const inventoryId = req.params.id;
    const name = req.body.inventoryName;

    const sqlUpdateInventory = "UPDATE inventory SET inventoryName = ? WHERE inventoryId = ?";
    db.query(sqlUpdateInventory, [name, inventoryId], (err, result) => {
        if(err) console.log(err)
    })
})



app.listen(3001, () => {
    console.log("server started")
})