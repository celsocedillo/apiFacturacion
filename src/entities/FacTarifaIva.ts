import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fac_tarifa_iva_pkey", ["codigo"], { unique: true })
@Entity("fac_tarifa_iva", { schema: "inventario" })
export class FacTarifaIva {

  @PrimaryGeneratedColumn({ type: "integer", name: "codigo" })
  codigo: number;

  @Column("character varying", { name: "tarifa", nullable: true, length: 80})
  tarifa: string | null;

  @Column("character varying", { name: "default", nullable: true, length: 1})
  default: string | null;


}
