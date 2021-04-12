import { Request, Response } from "express";
import { getRepository,  getManager} from 'typeorm';

import { GeneralesService } from '../services/generalesService';

const generalesService = new GeneralesService();

export const getBodegas =  async (req : Request, res: Response):Promise<Response> => {
    try{
        const resultado = await generalesService.getBodegas();
        return res.status(201).json({data: resultado});
    }catch(err){
        return res.status(501).send({error:err.stack});
    }
}

export const getClienteByRuc = async (req : Request, res: Response):Promise<Response> => {
    try{
        const resultado = await generalesService.getClienteByRuc(req.params.documento);
        return res.status(201).json({data: resultado});
    }catch(err){
        return res.status(501).send({error:err.stack});
    }
}


export const create = async (req : Request, res: Response):Promise<Response> => {
    try{
        let record = req.body;
        const resultado = await generalesService.create(record);
        return res.status(201).json({data: resultado})
    }catch(err){
        // logger.error(err.stack);
        // mail.enviarMail(err.stack, `${msgAsunto} - [create]`)
        return res.status(501).send({error:err.stack});
    }
   
}