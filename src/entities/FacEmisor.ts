import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fac_emisor_pkey", ["id"], { unique: true })
@Entity("fac_emisor", { schema: "inventario" })
export class FacEmisor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "ruc", nullable: true, length: 13 })
  ruc: string | null;

  @Column("character varying", {
    name: "razon_social",
    nullable: true,
    length: 300,
  })
  razonSocial: string | null;

  @Column("character varying", {
    name: "nombre_comercial",
    nullable: true,
    length: 300,
  })
  nombreComercial: string | null;

  @Column("character varying", {
    name: "direccion_matriz",
    nullable: true,
    length: 300,
  })
  direccionMatriz: string | null;

  @Column("character varying", {
    name: "direccion_emisor",
    nullable: true,
    length: 300,
  })
  direccionEmisor: string | null;

  @Column("character varying", {
    name: "codigo_establecimiento",
    nullable: true,
    length: 3,
  })
  codigoEstablecimiento: string | null;

  @Column("character varying", {
    name: "codigo_punto_emision",
    nullable: true,
    length: 3,
  })
  codigoPuntoEmision: string | null;

  @Column("character varying", {
    name: "contabilidad",
    nullable: true,
    length: 2,
  })
  contabilidad: string | null;
}
