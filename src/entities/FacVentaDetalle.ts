import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacVenta } from "./FacVenta";

@Index("fa_ventas_detalle_pkey", ["id"], { unique: true })
@Entity("fac_venta_detalle", { schema: "inventario" })
export class FacVentaDetalle {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "producto_id", nullable: true })
  productoId: number | null;


  @Column("integer", { name: "tipo_detalle", nullable: true })
  tipoDetalle: number | null;

  @Column("integer", { name: "venta_id", nullable: true })
  ventaId: number | null;

  @Column("character varying", {
    name: "descripcion_manual",
    nullable: true,
    length: 150,
  })
  descripcionManual: string | null;

  @Column("integer", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("numeric", {
    name: "valor_unitario",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorUnitario: string | null;

  @Column("numeric", {
    name: "valor_descuento",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorDescuento: string | null;


  @Column("integer", { name: "codigo_impuesto", nullable: true })
  codigoImpuesto: number | null;

  @Column("numeric", {
    name: "porcentaje_impuesto",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  porcentajeImpuesto: string | null;

  @Column("numeric", {
    name: "valor_impuesto",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorImpuesto: string | null;

  
  @ManyToOne(() => FacVenta, (facVenta) => facVenta.facVentaDetalles, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "venta_id", referencedColumnName: "id" }])
  venta: FacVenta;
}
