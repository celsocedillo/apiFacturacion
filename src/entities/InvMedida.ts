import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvItem } from "./InvItem";

@Index("inv_medida_pkey", ["id"], { unique: true })
@Entity("inv_medida", { schema: "inventario" })
export class InvMedida {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", length: 250 })
  nombre: string;

  @Column("character varying", { name: "estado", length: 1 })
  estado: string;

  @OneToMany(() => InvItem, (invItem) => invItem.idMedida)
  invItems: InvItem[];
}
