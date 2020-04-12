const express = require('express');
const path = require('path');
const app = express();
const {v4} = require('uuid');
let CONTACTS = [
    {
        id: v4(),
        name: 'Olga',
        value: 'hohoho',
        marked: false
    }
];

app.use(express.json());
//GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
});
//POST
app.post('/api/contacts', (req, res) => {

    const contact = {
        ...req.body,
        id: v4(),
        marked: false
    };
    res.status(201).json(contact);
    CONTACTS.push(contact);
});

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json(CONTACTS);
});

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const contact = CONTACTS.find(c => c.id === req.params.id);
    contact.marked = true;
    res.status(200).json(CONTACTS);
});

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});
app.listen(3000, () => {
    console.log("server has been started on port 3000")
});
