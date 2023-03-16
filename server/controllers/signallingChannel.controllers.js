const {User,Signal} = require('../db/models')

exports.sendMessage= async(req,res)=>{
    const {user} = req.session;
    const {message, recepient} = req.body;

    if(!user){res.status(401).json({err:'no session for current user found'});return}

    const record =  Signal.create({message,fromId:user.id,toId:recepient})
}

exports.getMessage= async(req,res)=>{
    const {user} = req.session;

    if(!user){res.status(401).json({err:'no session for current user found'});return}

    const record =  Signal.findAll({where:{toId:user.id}})
}