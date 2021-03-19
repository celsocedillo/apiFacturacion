import { Request, Response } from "express";
import { getRepository,  getManager, In} from 'typeorm';
import { InvBodega } from "../entities/InvBodega";
import { GenCliente } from "../entities/GenCliente";

export class GeneralesService {
    async getBodegas(){
        try{
            const result = await getRepository(InvBodega)
                            .createQueryBuilder("bodegas")
                            .select("bodegas")
                            .getMany();
            return result;
        }catch(err){
            throw new Error(err);
        }
    }

    async getClienteByRuc(pdocumento: string) {
        try{
            const result = await getRepository(GenCliente)
                           .createQueryBuilder("cliente")
                           .select("cliente")
                           .where("cliente.rucCedula = :documento", {documento : pdocumento})
                           .getOne();
            return result;
        }catch(err){
            throw new Error(err);
        }
    }

}