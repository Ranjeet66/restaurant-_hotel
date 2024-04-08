const express = require('express');
const Person = require('./../models/person');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const respone = await newPerson.save();
        console.log('data saved');
        res.status(200).json(respone);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interal Server error' });

    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fetched");
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interal Server error' });

    }
});

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the perso
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:workType',async(req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType=='chef'|| workType=='manager'|| workType=='waiter'){;
        const respone = await Person.find({work:workType});
        console.log("Work Type Feteched");
        res.status(200).json(respone);
        }else{
            res.status(400).json({error:"Invalid Work Type"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}); 


module.exports = router;