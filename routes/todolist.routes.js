const {Router} = require('express')
const ToDoData = require('../models/ToDoData')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()


// /api/toDoList
router.post('/', auth, async (req, res) => {
    try {

        const taskItem = new ToDoData({
            task: req.body.task, 
            complete: req.body.complete, 
            owner: req.user.userId
        })

        await taskItem.save()

        res.status(201).json({ taskItem })

    } catch(e) {
        res.status(500).json({message: 'Something went wrong on posting new task'})
    }
})

// /api/toDoList/deleteDone
router.post('/deleteDone', auth, async (req, res) => {
    try {
        if(!req.body) return res.sendStatus(400);

        console.log(req.body.owner)

        await ToDoData.deleteMany(
            {
                owner: req.body.owner,
                complete: true
            }, {})
        res.status(201).json({message: "Removed done task(s)"})
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong on deleting tasks'})
    }
})

// /api/toDoList/update
router.post('/update', auth, async (req, res) => {
    try {
        if(!req.body) return res.sendStatus(400);


        const newData = await ToDoData.findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                complete: req.body.complete
            })
        
        
        res.status(201).json({
            message: 'Marked as done',
            data: newData
        })

    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong on updating task status'})
    }
})

// /api/toDoList
router.get('/', auth, async (req, res) => {
    try {
        const list = await ToDoData.find({owner: req.user.userId})
        res.json(list)
    } catch(e) {
        res.status(500).json({message: 'Something went wrong on getting tasks'})
    }
})

module.exports = router