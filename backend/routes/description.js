const express = require("express");
const router = express.Router();    
const Description = require("../models/Description");
router.get("/", async(req, res) => {    
    try{
        const descriptions = await Description.find();
        res.status(200).json(descriptions);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Error fetching descriptions" });
    }   

})
 module.exports = router
