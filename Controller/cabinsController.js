const Cabin = require("../Model/cabinsModel");

exports.getAllCabins = async (req,res)=>{
    try{
        const newCabin = await Cabin.create({name : 'amir'});
        res.status(200).json({
            status : 'success',
            data : newCabin
        })
    }catch(err){
        res.status(404).json({
            status : 'error',
            data : err
        })
    }
}