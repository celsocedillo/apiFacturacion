import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacVentaDetalle } from "./FacVentaDetalle";
import { GenCliente } from "./GenCliente";

@Index("fac_ventas_pkey", ["id"], { unique: true })
@Entity("fac_venta", { schema: "inventario" })
export class FacVenta {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "cliente_id" })
  clienteId: number | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("numeric", {
    name: "valor_subtotal",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorSubtotal: string | null;

  @Column("numeric", {
    name: "valor_descuento",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorDescuento: string | null;

  @Column("integer", { name: "porcentaje_iva", nullable: true })
  porcentajeIva: number | null;

  @Column("numeric", {
    name: "valor_iva",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorIva: string | null;

  @Column("numeric", {
    name: "valor_flete",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  valorFlete: string | null;

  @Column("integer", { name: "comprobante_id", nullable: true })
  comprobanteId: number | null;

  @OneToMany(() => FacVentaDetalle, (facVentaDetalle) => facVentaDetalle.venta)
  facVentaDetalles: FacVentaDetalle[];

  @ManyToOne(() => GenCliente, (genCliente) => genCliente.facVentas)
  @JoinColumn([{ name: "cliente_id", referencedColumnName: "id" }])
  cliente: GenCliente;
}
