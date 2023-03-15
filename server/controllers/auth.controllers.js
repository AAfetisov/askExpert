const {User} = require('../db/models')
const bcrypt = require('bcrypt')

exports.checkUserAndCreateSession= async(req,res)=>{
    const {email,password}= req.body;
    
    if(!email || !password){res.status(401).json({err:'Email, password should not be empty'});return}

    try{
        const userRecord = await User.findOne({where:{email}})
        if(!userRecord){res.status(401).json({err:'Wrong email'});return}
        
        const passOk = await bcrypt.compare(password, userRecord.password);
        if(!passOk){res.status(401).json({err:'Wrong password'});return}


        req.session.user = {id:userRecord.id, email:userRecord.email};

        req.session.save(()=>{if(req.session.user){

            res.json({id:userRecord.id,email:userRecord.email});

        }})

    }
    catch(error){
        console.log('checkUserAndCreateSession: ',error);
        res.status(501).json({err:'something wrong with the Db :('})
    }
}

exports.createNewUserAndSession = async(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){res.status(401).json({err:'Email, password should not be empty'});return}

    try{
        const userRecord = await User.findOne({where:{email}});
        if(userRecord){res.status(401).json({err:'User with this email already exists'});return}
        
        const hashedPass = await bcrypt.hash(password,10);
        const newUserRecord = await User.create({email,password:hashedPass});

        req.session.user = {id:newUserRecord.id,email:newUserRecord.email};
        res.json({id:newUserRecord.id,email:newUserRecord.email});
        console.log(req.session);
    }
    catch(error){
        console.log('createNewUserAndSession: ',error);
        res.status(501).json({err:'something wrong with the Db :('})
    }
}

exports.destroySession = (req,res)=>{
    req.session.destroy(async (err) => {
        if (err) {
            console.log('Error:',err);
            res.sendStatus(401);
        } else {
            await res.clearCookie("exp",{ httpOnly: true });
            res.sendStatus(200);
        }
    })
}

exports.validateSession=(req,res)=>{
    const{user} = req.session;
    
    if(!user){res.status(401).json({err:'no session for current user found'});return}

    res.json(user)
}