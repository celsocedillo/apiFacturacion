import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvArticuloBodega } from "./InvArticuloBodega";
import { InvGrupo } from "./InvGrupo";
import { InvMedida } from "./InvMedida";
import { InvMovimientoDetalle } from "./InvMovimientoDetalle";

@Index("inv_item_pkey", ["id"], { unique: true })
@Entity("inv_item", { schema: "inventario" })
export class InvItem {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "codigo", length: 50 })
  codigo: string;

  @Column("character varying", { name: "descripcion", length: 300 })
  descripcion: string;

  @Column("date", { name: "fecha_ultimo_ingreso", nullable: true })
  fechaUltimoIngreso: string | null;

  @Column("date", { name: "fecha_ultimo_egreso", nullable: true })
  fechaUltimoEgreso: string | null;

  @Column("numeric", {
    name: "costo_anterior",
    nullable: true,
    precision: 17,
    scale: 3,
  })
  costoAnterior: string | null;

  @Column("numeric", {
    name: "costo_actual",
    nullable: true,
    precision: 17,
    scale: 3,
  })
  costoActual: string | null;

  @Column("character varying", {
    name: "observacion",
    nullable: true,
    length: 300,
  })
  observacion: string | null;

  @Column("character varying", { name: "estado", length: 1 })
  estado: string;

  @OneToMany(
    () => InvArticuloBodega,
    (invArticuloBodega) => invArticuloBodega.idItem
  )
  invArticuloBodegas: InvArticuloBodega[];

  @ManyToOne(() => InvGrupo, (invGrupo) => invGrupo.invItems)
  @JoinColumn([{ name: "id_grupo", referencedColumnName: "id" }])
  idGrupo: InvGrupo;

  @ManyToOne(() => InvMedida, (invMedida) => invMedida.invItems)
  @JoinColumn([{ name: "id_medida", referencedColumnName: "id" }])
  idMedida: InvMedida;

  @OneToMany(
    () => InvMovimientoDetalle,
    (invMovimientoDetalle) => invMovimientoDetalle.idItem
  )
  invMovimientoDetalles: InvMovimientoDetalle[];
}
