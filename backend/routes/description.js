const express = require("express");
const router = express.Router();    
const Description = require("../models/Description");
const Yoga = require("../models/MeditationPractice");
router.get("/", async(req, res) => {    
    try{
        const descriptions = await Description.find();
        //console.log(descriptions);
        res.status(200).json(descriptions);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Error fetching descriptions" });
    }   

})

router.get("/:pose", async(req, res) =>
{
    try{
        console.log(req.params.pose);
          const poses = await Yoga.findOne({ name: req.params.pose });  
          console.log(poses);   
          res.status(200).json(poses);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Error fetching poses" });
    }   
}
)
 module.exports = router
