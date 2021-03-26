import { Column, Entity, Index } from "typeorm";

@Index("fac_tipo_comprobante_pkey", ["id"], { unique: true })
@Entity("fac_tipo_comprobante", { schema: "inventario" })
export class FacTipoComprobante {
  @Column("character varying", { primary: true, name: "id", length: 2 })
  id: string;

  @Column("character varying", {
    name: "tipo_comprobante",
    nullable: true,
    length: 150,
  })
  tipoComprobante: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 2 })
  estado: string | null;
}
