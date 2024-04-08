const express = require('express');
const Person = require('./../models/menuItem');
const menuItem = require('./../models/menuItem');

const router = express.Router();



router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new menuItem(data);
        const respone = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(respone);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interal Server error' });

    }
});

router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log("Data Fetched");
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interal Server error' });

    }
});

router.put('/:id', async (req, res)=>{
    try{
        const menuItemId = req.params.id; // Extract the id from the URL parameter
        const updatedMenuData = req.body; // Updated data for the perso
        const response = await menuItem.findByIdAndUpdate(menuItemId, updatedMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
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
        const menuItemId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await menuItem.findByIdAndRemove(menuItemId);
        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.get('/:tasteType',async(req,res)=>{
    try {
        const tasteType = req.params.tasteType;
        if(tasteType=='sweet'||tasteType=='spicy'||tasteType=='sour'){;
        const respone = await menuItem.find({taste:tasteType});
        console.log("Taste Type Feteched");
        res.status(200).json(respone);
        }else{
            res.status(400).json({error:"Invalid Taste Type"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;