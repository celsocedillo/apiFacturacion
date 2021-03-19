import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("inv_secuencia_pkey", ["id"], { unique: true })
@Entity("inv_secuencia", { schema: "inventario" })
export class InvSecuencia {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "id_tipo_movimiento" })
  idTipoMovimiento: number;

  @Column("numeric", { name: "anio", nullable: true, precision: 4, scale: 0 })
  anio: string | null;

  @Column("numeric", {
    name: "secuencia",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  secuencia: string | null;

  @Column("date", { name: "fecha_crea", nullable: true })
  fechaCrea: string | null;

  @Column("date", { name: "fecha_ultima_secuencia", nullable: true })
  fechaUltimaSecuencia: string | null;
}
