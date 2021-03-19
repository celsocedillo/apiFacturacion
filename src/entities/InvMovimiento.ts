import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvBodega } from "./InvBodega";
import { InvTipoMovimiento } from "./InvTipoMovimiento";
import { InvMovimientoDetalle } from "./InvMovimientoDetalle";

@Index("inv_movimiento_pkey", ["id"], { unique: true })
@Entity("inv_movimiento", { schema: "inventario" })
export class InvMovimiento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", { name: "anio", precision: 4, scale: 0 })
  anio: string;

  @Column("numeric", { name: "numero_movimiento", precision: 8, scale: 0 })
  numeroMovimiento: string;

  @Column("character varying", {
    name: "observacion",
    nullable: true,
    length: 500,
  })
  observacion: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 2 })
  estado: string | null;

  @Column("character varying", {
    name: "usuario_aprueba",
    nullable: true,
    length: 15,
  })
  usuarioAprueba: string | null;

  @Column("character varying", {
    name: "usuario_autoriza",
    nullable: true,
    length: 15,
  })
  usuarioAutoriza: string | null;

  @Column("character varying", { name: "usuario_solicita", length: 15 })
  usuarioSolicita: string;

  @Column("numeric", {
    name: "id_direccion_solicita",
    nullable: true,
    precision: 2,
    scale: 0,
  })
  idDireccionSolicita: string | null;

  @Column("date", { name: "fecha_solicitud", nullable: true })
  fechaSolicitud: string | null;

  @Column("date", { name: "fecha_autorizacion", nullable: true })
  fechaAutorizacion: string | null;

  @Column("date", { name: "fecha_aprobacion", nullable: true })
  fechaAprobacion: string | null;

  @Column("character varying", {
    name: "usuario_anula",
    nullable: true,
    length: 15,
  })
  usuarioAnula: string | null;

  @Column("date", { name: "fecha_anula", nullable: true })
  fechaAnula: string | null;

  @Column("character varying", {
    name: "motivo_anula",
    nullable: true,
    length: 250,
  })
  motivoAnula: string | null;

  @Column("numeric", {
    name: "id_movimiento_relacion",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  idMovimientoRelacion: string | null;

  @Column("numeric", {
    name: "anio_documento_referencia",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  anioDocumentoReferencia: string | null;

  @Column("numeric", {
    name: "numero_documento_referencia",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  numeroDocumentoReferencia: string | null;

  @ManyToOne(() => InvBodega, (invBodega) => invBodega.invMovimientos)
  @JoinColumn([{ name: "id_bodega", referencedColumnName: "id" }])
  idBodega: InvBodega;

  @ManyToOne(
    () => InvTipoMovimiento,
    (invTipoMovimiento) => invTipoMovimiento.invMovimientos
  )
  @JoinColumn([{ name: "id_tipo_movimiento", referencedColumnName: "id" }])
  idTipoMovimiento: InvTipoMovimiento;

  @OneToMany(
    () => InvMovimientoDetalle,
    (invMovimientoDetalle) => invMovimientoDetalle.idMovimiento
  )
  invMovimientoDetalles: InvMovimientoDetalle[];
}
