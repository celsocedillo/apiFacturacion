import { Request, Response } from "express";
import { getRepository,  getManager, In} from 'typeorm';
import { FacVenta } from "../entities/FacVenta";
import { FacVentaDetalle } from "../entities/FacVentaDetalle";
import { FacEmisor } from "../entities/FacEmisor";
import  builder  from 'xmlbuilder'

export class FacturaServices {


    async getEmisorById(pid: number){
        try{
            const result = await getRepository(FacEmisor)
                            .createQueryBuilder("emisor")
                            .select("emisor")
                            .where("emisor.id = :id", {id : pid})
                            .getOne();
            return result;
        }catch(err){
            throw new Error(err);
        }
    }

    async getFacturas(){
        try{
            const result = await getRepository(FacVenta)
                            .createQueryBuilder("facturas")
                            .select("facturas")
                            .getMany();
            return result;
        }catch(err){
            throw new Error(err);
        }
    }

    async getFactura(pid: number){
        try{
            const result = await getRepository(FacVenta)
                                .createQueryBuilder("factura")
                                .select(["factura", "cliente.nombres", "cliente.apellidos", "cliente.rucCedula", "facVentaDetalles"])
                                .leftJoin("factura.cliente", "cliente")
                                .leftJoin("factura.facVentaDetalles", "facVentaDetalles")
                                .where("factura.id = :id", {id: pid})
                                .getOne();
            return result;
        }catch(err){
            throw new Error(err);
        }
    }

    async create(pregistro : any){
        try{
            let resultado = await getRepository(FacVenta).save(pregistro);
            for (let i = 0; i < pregistro.facVentaDetalles.length; i++ ){
                let detalle = {...resultado.facVentaDetalles[i], ventaId: resultado.id};
                const resultadoDetalle =  await getRepository(FacVentaDetalle).save(detalle);
                resultado.facVentaDetalles[i].ventaId = resultadoDetalle.id;
            }
            return resultado;
        }catch(err){
            throw new Error(err);
        }
    }

    async pruebaxml(pregistro: any){
        
        const emisor = await  this.getEmisorById(1);
        let fac = {
            factura: {
                "@id" : "comprobante",
                "@version" : "1.0.0",
                infoTributaria: {
                    ambiente : 1,
                    tipoEmision: 1,
                    razonSocial: emisor?.razonSocial,
                    nombreComercial: emisor?.nombreComercial,
                    ruc: emisor?.ruc,
                    claveAcceso: "",
                    codDoc: emisor?.codigoPuntoEmision,
                    estab: emisor?.codigoEstablecimiento,
                    secuencial: "111",
                    dirMatriz: emisor?.direccionMatriz
                },
                infoFactura: {
                    fechaEmision: pregistro.fechaEmision,
                    dirEstablecimiento: emisor?.direccionEmisor,
                    obligadoContabilidad: "SI",
                    tipotipoIdentificacionComprador: "04",
                    razonSocialComprador: "",
                    identificacionComprador: "",
                    totalSinImpuestos: pregistro.subTotal,
                    totalDescuento: 0.00,
                    totalConImpuestos: {
                        totalImpuesto: {
                            codigo: 2,
                            codigoPorcentaje: 2,
                            baseImponible: pregistro.subTotal,
                            valor: pregistro.valorIva,
                            
                        }
                    }
                }
            }
        }
        let xml = builder.create(fac).end({pretty: true});
        console.log(xml);
    }

}