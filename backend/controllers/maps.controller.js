const mapService=require('../services/maps.service');


module.exports.getCoordinates=async(req,res,next)=>{
    
    const {address}=req.query;

    try{
        const coordinates=await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }
    catch(err){
        console.error(err);             
        console.error(err.message);
        res.status(404).json({message:'Coordinates not found'});
    }
}
module.exports.getDistanceTime = async (req, res, next) => {

    const { origin, destination } = req.query;

    try {
        const result = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.getAutoCompleteSuggestions = async (req,res)=>{

    const { input } = req.query;

    if(!input){
        return res.status(400).json({
            message:"Input is required"
        });
    }

    try{

        const suggestions =
            await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

}