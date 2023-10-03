const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())

app.get('/todos/:userEmail', async (req, res) => {
    
    const { userEmail } = req.params;

    try {
        const todos = await pool.query("SELECT * FROM todos where user_email = $1", [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err)
    }
})



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))