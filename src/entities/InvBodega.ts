import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvArticuloBodega } from "./InvArticuloBodega";
import { InvMovimiento } from "./InvMovimiento";

@Index("inv_bodega_pkey", ["id"], { unique: true })
@Entity("inv_bodega", { schema: "inventario" })
export class InvBodega {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", {
    name: "cuenta_contable",
    nullable: true,
    length: 50,
  })
  cuentaContable: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 1 })
  estado: string | null;

  @OneToMany(
    () => InvArticuloBodega,
    (invArticuloBodega) => invArticuloBodega.idBodega
  )
  invArticuloBodegas: InvArticuloBodega[];

  @OneToMany(() => InvMovimiento, (invMovimiento) => invMovimiento.idBodega)
  invMovimientos: InvMovimiento[];
}
