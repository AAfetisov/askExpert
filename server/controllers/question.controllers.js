const {Question,Subject,Tag} = require('../db/models')

exports.CreateQuestion = async (req,res)=>{
    const {user} = req.session;
    const {price,title,text,tags}= req.body;
    if(!user||!title||!text||!price||!parseInt(price,10)){res.status(401).json({err:'Something wrong with your data'});return} 
    try{
        const questionRec = await Question.create({userId:user.id, title,text, price})

        for (const tag of tags) {
            const [subj,created] = await Subject.findOrCreate({where:{title:tag},defaults:{ title: tag }});
            const tagRec = await Tag.create({subjectId:subj.id,questionId:questionRec.id})
        }

        if(!questionRec){res.status(401).json({err:'Something wrong with the input data'})}
        res.json(questionRec.id);

    }catch(error){
        console.log('CreateQuestion: ',error);
        res.status(501).json({err:'something wrong with the Db :('})
    }
}