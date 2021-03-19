import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvMovimiento } from "./InvMovimiento";

@Index("inv_tipo_movimiento_pkey", ["id"], { unique: true })
@Entity("inv_tipo_movimiento", { schema: "inventario" })
export class InvTipoMovimiento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", length: 50 })
  nombre: string;

  @Column("character varying", { name: "ingreso_egreso", length: 1 })
  ingresoEgreso: string;

  @Column("character varying", { name: "estado", length: 1 })
  estado: string;

  @OneToMany(
    () => InvMovimiento,
    (invMovimiento) => invMovimiento.idTipoMovimiento
  )
  invMovimientos: InvMovimiento[];
}
