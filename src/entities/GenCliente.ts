import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacVenta } from "./FacVenta";

@Index("gen_cliente_pkey", ["id"], { unique: true })
@Entity("gen_cliente", { schema: "inventario" })
export class GenCliente {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "ruc_cedula",
    nullable: true,
    length: 15,
  })
  rucCedula: string | null;

  @Column("character varying", { name: "nombres", nullable: true, length: 200 })
  nombres: string | null;

  @Column("character varying", {
    name: "apellidos",
    nullable: true,
    length: 200,
  })
  apellidos: string | null;

  @Column("character varying", {
    name: "direccion",
    nullable: true,
    length: 250,
  })
  direccion: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 25 })
  telefono: string | null;

  @OneToMany(() => FacVenta, (facVenta) => facVenta.cliente)
  facVentas: FacVenta[];
}
