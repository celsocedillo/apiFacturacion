import { Column, Entity, Index } from "typeorm";

@Index("fac_tipo_identificacion_pkey", ["id"], { unique: true })
@Entity("fac_tipo_identificacion", { schema: "inventario" })
export class FacTipoIdentificacion {
  @Column("character varying", { primary: true, name: "id", length: 2 })
  id: string;

  @Column("character varying", {
    name: "descripcion",
    nullable: true,
    length: 250,
  })
  descripcion: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 2 })
  estado: string | null;
}
