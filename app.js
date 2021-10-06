const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extendet: true }))

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/toDoList', require('./routes/todolist.routes'))

if(process.env.NODE_ENV === "production") {
    app.use(express.static('./client/build/'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8080

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUrl'), {
            UsenewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (e) {
        console.log('Server error:', e.message)
        process.exit(1)
    }
}

start()

app.listen(PORT, () => console.log('App has been started on PORT:', PORT))