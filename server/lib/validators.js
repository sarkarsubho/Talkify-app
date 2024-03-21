import {body, validationResult} from "express-validator";


const registerValidator =()=>[
    body(["name", "username", "bio", "password"]).notEmpty(),
];

const validateHandler = (req,res,next)=>{
const errors =validationResult(req);
console.log(errors)
if(errors.isEmpty()) return next();
}

export {registerValidator,validateHandler}