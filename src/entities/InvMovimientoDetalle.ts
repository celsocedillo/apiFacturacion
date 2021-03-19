import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvItem } from "./InvItem";
import { InvMovimiento } from "./InvMovimiento";

@Index("inv_movimiento_detalle_pkey", ["id"], { unique: true })
@Entity("inv_movimiento_detalle", { schema: "inventario" })
export class InvMovimientoDetalle {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", {
    name: "costo_actual",
    nullable: true,
    precision: 12,
    scale: 3,
  })
  costoActual: string | null;

  @Column("numeric", {
    name: "stock_actual",
    nullable: true,
    precision: 12,
    scale: 3,
  })
  stockActual: string | null;

  @Column("numeric", {
    name: "costo_movimiento",
    nullable: true,
    precision: 12,
    scale: 3,
  })
  costoMovimiento: string | null;

  @Column("numeric", {
    name: "cantidad_movimiento",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadMovimiento: string | null;

  @Column("character varying", {
    name: "observacion",
    nullable: true,
    length: 250,
  })
  observacion: string | null;

  @Column("character varying", {
    name: "descripcion_adicional",
    nullable: true,
    length: 500,
  })
  descripcionAdicional: string | null;

  @Column("numeric", {
    name: "cantidad_nuevo_stock",
    nullable: true,
    precision: 12,
    scale: 3,
  })
  cantidadNuevoStock: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 1 })
  estado: string | null;

  @ManyToOne(() => InvItem, (invItem) => invItem.invMovimientoDetalles)
  @JoinColumn([{ name: "id_item", referencedColumnName: "id" }])
  idItem: InvItem;

  @ManyToOne(
    () => InvMovimiento,
    (invMovimiento) => invMovimiento.invMovimientoDetalles
  )
  @JoinColumn([{ name: "id_movimiento", referencedColumnName: "id" }])
  idMovimiento: InvMovimiento;
}
