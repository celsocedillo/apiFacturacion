import { Request, Response } from "express";
import { getRepository,  getManager, In, createQueryBuilder} from 'typeorm';
import { FacVenta } from "../entities/FacVenta";
import { FacVentaDetalle } from "../entities/FacVentaDetalle";
import { FacEmisor } from "../entities/FacEmisor";
import { GenCliente } from '../entities/GenCliente';
import { FacTipoIdentificacion } from '../entities/FacTipoIdentificacion';
import { FacTarifaIva } from '../entities/FacTarifaIva';
import  builder  from 'xmlbuilder'

export class FacturaServices {

    
    async getTarifasIva(){
        try{
            const result = await getRepository(FacTarifaIva)
                           .createQueryBuilder("tarifas")
                           .select("tarifas")
                           .orderBy("tarifas.default", "DESC")
                           .getMany();
            return result;
        }catch(err){
            throw new Error(err);
        }
    }


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

            console.log("factura", result);
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

        const receptor = await getRepository(GenCliente)
                    .createQueryBuilder("cliente")
                    .innerJoinAndMapOne("cliente.tipoIdentificacion", FacTipoIdentificacion, "tipoIdentificacion", "cliente.tipoIdentificacionId = tipoIdentificacion.id")
                    .where("cliente.id = :id", {id: pregistro.clienteId} )
                    .printSql()
                    .getOne();

        let codigoPorcentajeIva;

        switch(pregistro.porcentajeIva){
            case 0 : codigoPorcentajeIva = 0; break;
            case 12: codigoPorcentajeIva = 2; break;
            case 14: codigoPorcentajeIva = 3; break;
        }

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
                    codDoc: "01",
                    estab: emisor?.codigoEstablecimiento,
                    ptoEmi: emisor?.codigoPuntoEmision,
                    secuencial: "111",
                    dirMatriz: emisor?.direccionMatriz
                },
                infoFactura: {
                    fechaEmision: pregistro.fechaEmision,
                    obligadoContabilidad: emisor?.contabilidad,
                    tipotipoIdentificacionComprador: receptor?.tipoIdentificacionId,
                    razonSocialComprador: `${receptor?.apellidos} ${receptor?.nombres}`,
                    identificacionComprador: receptor?.rucCedula,
                    direccionComprador: receptor?.direccion,
                    totalSinImpuestos: pregistro.subTotal,
                    totalDescuento: 0.00,
                    totalConImpuestos: {
                        totalImpuesto: {
                            codigo: 2,
                            codigoPorcentaje: codigoPorcentajeIva,
                            baseImponible: pregistro.subTotal,
                            tarifa: pregistro.porcentajeIva,
                            valor: pregistro.valorIva,
                        }
                    },
                    propina: 0,
                    importeTotal: pregistro.valorTotal,
                    moneda: "DOLAR",
                    pagos: {
                        pago: {
                            formaPago: "01",
                            total: pregistro.valorTotal
                        }
                    }                   
                }
            }
        }
        let xml = builder.create(fac).end({pretty: true});
        console.log(xml);
    }

}