import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvItem } from "./InvItem";

@Index("inv_grupo_pkey", ["id"], { unique: true })
@Entity("inv_grupo", { schema: "inventario" })
export class InvGrupo {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "codigo", length: 10 })
  codigo: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", {
    name: "cuenta_contable",
    nullable: true,
    length: 30,
  })
  cuentaContable: string | null;

  @Column("character varying", { name: "estado", length: 1 })
  estado: string;

  @OneToMany(() => InvItem, (invItem) => invItem.idGrupo)
  invItems: InvItem[];
}
