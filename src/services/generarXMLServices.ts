import { getRepository,  getManager, In, createQueryBuilder} from 'typeorm';
import  builder  from 'xmlbuilder'
import {FacturaServices} from './facturaServices';
import { GenCliente } from '../entities/GenCliente';
import { FacTipoIdentificacion } from '../entities/FacTipoIdentificacion';
import { FacTarifaIva } from '../entities/FacTarifaIva';
import xmlbuilder from 'xmlbuilder';

const facturaServices = new FacturaServices();

export class GenerarXMLService {

    async generaFacturaX(pid : number){

        const factura = await facturaServices.getFactura(pid);
        const emisor = await  facturaServices.getEmisorById(1);
        const tarifasIva = await facturaServices.getTarifasIva();

        const receptor = await getRepository(GenCliente)
        .createQueryBuilder("cliente")
        .innerJoinAndMapOne("cliente.tipoIdentificacion", FacTipoIdentificacion, "tipoIdentificacion", "cliente.tipoIdentificacionId = tipoIdentificacion.id")
        .where("cliente.id = :id", {id: factura?.clienteId} )
        .getOne();

        
        console.log("XML", factura);


        //-----------------------------------------------------------------------------------------------------
        //Detalle de totales de impuestos
        //-----------------------------------------------------------------------------------------------------

        let xmlTotalImpuesto:any = []

        tarifasIva.map((tar: any) => {
            const filtrado = factura?.facVentaDetalles.filter(x => x.codigoImpuesto == tar.codigo)
            let baseImponible = 0.00;
            let valor = 0.00
            filtrado?.map((x:any) => {
                baseImponible += (parseInt(x?.cantidad) * parseFloat(x?.valorUnitario)) - parseFloat(x?.valorDescuento);
                valor += parseFloat(x.valorImpuesto);
            })
            if (baseImponible > 0){
                let totalImpuesto = {totalImpuesto: {codigo : 2, 
                                     codigoPorcentaje: tar?.codigo, 
                                     baseImponible: baseImponible, 
                                     tarifa: tar.tarifa,
                                     valor: valor}
                                    };
                
                xmlTotalImpuesto.push(totalImpuesto);
            }
        })


        //-----------------------------------------------------------------------------------------------------
        //Detalle de factura
        //-----------------------------------------------------------------------------------------------------

        let xmlDetalles : any =  [];
        let i = 1;
        factura?.facVentaDetalles.map((item : any) => {
            let baseImponible = (parseInt(item.cantidad) * parseFloat(item?.valorUnitario)) - parseFloat(item.valorDescuento)
            let detalle = {
                            detalle: {
                                codigoPrincipal: item.productoId == null ? i : item.productoId,
                                codigoAuxiliar: i,
                                descripcion: item.descripcionManual,
                                cantidad: item.cantidad,
                                precioUnitario: item.valorUnitario,
                                descuento: item.valorDescuento,
                                precioTotalSinImpuesto: baseImponible,
                                impuestos : [{
                                    impuesto: {
                                        codigo: 2,
                                        codigoPorcentaje: item.codigoImpuesto,
                                        tarifa: item.valorImpuesto,
                                        baseImponible: baseImponible,
                                        valor: item.valorImpuesto
                                    }}]
                                }
                            }
                          
            xmlDetalles.push(detalle);
        })

        console.log("detalles ==> ", xmlDetalles);

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
                },
                detalles : [xmlDetalles]
            }
        }
        let xml = builder.create(fac).end({pretty: true});
        console.log(xml);
    }

    async generaFactura(pid: number){
        const factura:any = await facturaServices.getFactura(pid);
        const emisor:any = await  facturaServices.getEmisorById(1);
        const tarifasIva = await facturaServices.getTarifasIva();

        const receptor:any = await getRepository(GenCliente)
        .createQueryBuilder("cliente")
        .innerJoinAndMapOne("cliente.tipoIdentificacion", FacTipoIdentificacion, "tipoIdentificacion", "cliente.tipoIdentificacionId = tipoIdentificacion.id")
        .where("cliente.id = :id", {id: factura?.clienteId} )
        .getOne();

        let xml = builder.create('factura').att('id', "comprobante")
                                           .att('version', "1.1.0")
                         .ele('infoTributaria')
                         .ele('ambiente', 2).up()
                         .ele('tipoEmision', 1).up()
                         .ele('razonSocial', emisor?.razonSocial).up()
                         .ele('nombreComercial', emisor?.nombreComercial).up()
                         .ele('ruc', emisor.ruc).up()
                         .ele('claveAcceso', "").up()
                         .ele('codDoc', "01").up()
                         .ele('estab', emisor.codigoEstablecimiento).up()
                         .ele('ptoEmi', emisor.codigoPuntoEmision).up()
                         .ele('secuencial', "1111").up()
                         .ele('dirMatriz', emisor.direccionMatriz).up().up()
                         .ele('infoFactura')
                         .ele('fechaEmision', factura?.fecha).up()
                         .ele('obligadoContabilidad', emisor?.contabilidad).up()
                         .ele('tipotipoIdentificacionComprador', receptor?.tipoIdentificacionId).up()
                         .ele('razonSocialComprador', `${receptor?.apellidos} ${receptor?.nombres}`).up()
                         .ele('identificacionComprador', receptor?.rucCedula).up()
                         .ele('direccionComprador', receptor?.direccion).up()
                         .ele('totalSinImpuestos', factura?.valorSubtotal).up()
                         .ele('totalDescuento', factura?.valorDescuento).up()
                         .ele('totalConImpuestos');


        //-----------------------------------------------------------------------------------------------------
        //Detalle de totales de impuestos
        //-----------------------------------------------------------------------------------------------------

             tarifasIva.map((tar: any) =>  {
                const filtrado = factura?.facVentaDetalles.filter((x:any) => x.codigoImpuesto == tar.codigo)
                let baseImponible = 0.00;
                let valor = 0.00
                filtrado?.map((x:any) => {
                    baseImponible += (parseInt(x?.cantidad) * parseFloat(x?.valorUnitario)) - parseFloat(x?.valorDescuento);
                    valor += parseFloat(x.valorImpuesto);
                })
                if (baseImponible > 0){
                    xml.ele('totalImpuesto')
                       .ele('codigo', 2).up()
                       .ele('codigoPorcentaje', tar?.codigo).up()
                       .ele('baseImponible', baseImponible).up()
                       .ele('tarifa', tar.tarifa).up()
                       .ele('valor', valor).up()      
                }
            })

              xml.up().ele('propina', 0).up()
               .ele('importeTotal', factura?.valorTotal).up()
               .ele('moneda', "DOLAR").up()
               .ele('pagos')
               .ele('pago')
               .ele('formaPago', "01").up()
               .ele('total', factura?.valorTotal).up().up().up().up()
               .ele('detalles')

        //-----------------------------------------------------------------------------------------------------
        //Detalle de factura
        //-----------------------------------------------------------------------------------------------------

        
        let i = 1;
        factura?.facVentaDetalles.map((item : any) => {
            let baseImponible = (parseInt(item.cantidad) * parseFloat(item?.valorUnitario)) - parseFloat(item.valorDescuento)
             xml.up().next().ele('detalle')
               .ele('codigoPrincipal', item.productoId == null ? i : item.productoId).up()
               .ele('codigoAuxiliar', i).up()
               .ele('descripcion', item.descripcionManual).up()
               .ele('cantidad', item.cantidad).up()
               .ele('precioUnitario', item.valorUnitario).up()
               .ele('descuento', item.valorDescuento).up()
               .ele('precioTotalSinImpuesto', baseImponible).up()
               .ele('impuestos')
               .ele('impuesto')
               .ele('codigo',2 ).up()
               .ele('codigoPorcentaje', item.codigoImpuesto).up()
               .ele('tarifa', item.valorImpuesto).up()
               .ele('baseImponible', baseImponible).up()
               .ele('valor', item.valorImpuesto)

        })

        
        console.log("XML ====>", xml.end({pretty: true}));
    }

}