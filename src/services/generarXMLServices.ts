import { getRepository,  getManager, In, createQueryBuilder} from 'typeorm';
import  builder  from 'xmlbuilder'
import {FacturaServices} from './facturaServices';
import { GenCliente } from '../entities/GenCliente';
import { FacTipoIdentificacion } from '../entities/FacTipoIdentificacion';
import { FacTarifaIva } from '../entities/FacTarifaIva';

const facturaServices = new FacturaServices();

export class GenerarXMLService {

    async generaFactura(pid : number){

        const factura = await facturaServices.getFactura(pid);
        const emisor = await  facturaServices.getEmisorById(1);
        const tarifasIva = await facturaServices.getTarifasIva();

        const receptor = await getRepository(GenCliente)
        .createQueryBuilder("cliente")
        .innerJoinAndMapOne("cliente.tipoIdentificacion", FacTipoIdentificacion, "tipoIdentificacion", "cliente.tipoIdentificacionId = tipoIdentificacion.id")
        .where("cliente.id = :id", {id: factura?.clienteId} )
        .getOne();

        
        console.log("XML", factura);

        let xmlTotalImpuesto:any = []

        tarifasIva.map((tar: any) => {
            //console.log("tarifa", tar.codigo);
            const filtrado = factura?.facVentaDetalles.filter(x => x.codigoImpuesto == tar.codigo)
            let baseImponible = 0.00;
            let valor = 0.00
            filtrado?.map((x:any) => {
                baseImponible += (x?.cantidad * x?.valorUnitario) - x?.valorDescuento;
                valor += x.valorImpuesto;
            })
            if (baseImponible > 0){
                let totalImpuesto = {totalImpuesto: {codigo : 2, 
                                     codigoPorcentaje: tar?.codigo, 
                                     baseImponible: baseImponible, 
                                     tarifa: tar.tarifa,
                                     valor: valor}
                                    };
                
                //xmlTotalImpuesto = [...xmlTotalImpuesto, totalImpuesto];
                xmlTotalImpuesto.push(totalImpuesto);
            }
        })
        console.log("tarifa con valores", xmlTotalImpuesto);

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
                    fechaEmision: factura?.fecha,
                    obligadoContabilidad: emisor?.contabilidad,
                    tipotipoIdentificacionComprador: receptor?.tipoIdentificacionId,
                    razonSocialComprador: `${receptor?.apellidos} ${receptor?.nombres}`,
                    identificacionComprador: receptor?.rucCedula,
                    direccionComprador: receptor?.direccion,
                    totalSinImpuestos: factura?.valorSubtotal,
                    totalDescuento: factura?.valorDescuento,
                    totalConImpuesto: xmlTotalImpuesto,
                    propina: 0,
                    importeTotal: factura?.valorTotal,
                    moneda: "DOLAR",
                    pagos: {
                        pago: {
                            formaPago: "01",
                            total: factura?.valorTotal
                        }
                    }                   
                }
            }
        }
        let xml = builder.create(fac).end({pretty: true});
        console.log(xml);
    }

}