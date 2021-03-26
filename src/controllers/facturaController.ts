import { Request, Response } from "express";
import { getRepository,  getManager} from 'typeorm';

import { FacturaServices } from '../services/facturaServices';
//import { logger } from "../utils/logger";
import moment from "moment";
import { FacVenta } from "../entities/FacVenta";
import config from "../config.json";
const facturaService = new FacturaServices();

//const mail = require(`${config.utilsFolder}/sendEmail`);

export const getEmisorById = async (req : Request, res: Response):Promise<Response> => {
    try{
        const resultado = await facturaService.getEmisorById(parseInt(req.params.id));
        return res.status(201).json({data: resultado});
    }catch(err){ 
        // logger.error(err.stack);
        // mail.enviarMail(err.stack, `${msgAsunto} - [getActas]`)
        return res.status(501).send({error:err.stack});
    }
}


export const getFacturas = async (req : Request, res: Response):Promise<Response> => {
    try{
        const resultado = await facturaService.getFacturas();
        return res.status(201).json({data: resultado});
    }catch(err){ 
        // logger.error(err.stack);
        // mail.enviarMail(err.stack, `${msgAsunto} - [getActas]`)
        return res.status(501).send({error:err.stack});
    }
}

export const getFactura = async (req : Request, res: Response):Promise<Response> => {
    try{
        const resultado = await facturaService.getFactura(Number.parseInt(req.params.id));
        return res.status(201).json({data: resultado});
    }catch(err){ 
        // logger.error(err.stack);
        // mail.enviarMail(err.stack, `${msgAsunto} - [getActas]`)
        return res.status(501).send({error:err.stack});
    }
}

export const create = async (req : Request, res: Response):Promise<Response> => {
    try{
        let record = req.body.factura;
        //console.log("factura", req.body);
        facturaService.pruebaxml(req.body);
        //const resultado = await facturaService.create(record);
        //return res.status(201).json({data: resultado})
        return res.status(201).json({data: null})
    }catch(err){
        // logger.error(err.stack);
        // mail.enviarMail(err.stack, `${msgAsunto} - [create]`)
        return res.status(501).send({error:err.stack});
    }
}


