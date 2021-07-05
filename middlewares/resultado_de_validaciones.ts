import { validationResult } from "express-validator";
import { Request, Response } from "express";

export const validarCampos = (req: Request, res: Response, next:Function ) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json(errores);
    }
    next();
}