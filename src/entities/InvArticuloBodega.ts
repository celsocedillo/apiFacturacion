import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvBodega } from "./InvBodega";
import { InvItem } from "./InvItem";

@Index("inv_articulo_bodega_pkey", ["id"], { unique: true })
@Entity("inv_articulo_bodega", { schema: "inventario" })
export class InvArticuloBodega {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", {
    name: "costo_promedio",
    nullable: true,
    precision: 12,
    scale: 3,
  })
  costoPromedio: string | null;

  @Column("numeric", {
    name: "cantidad_maxima",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadMaxima: string | null;

  @Column("numeric", {
    name: "cantidad_actual",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadActual: string | null;

  @Column("numeric", {
    name: "cantidad_inicio",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadInicio: string | null;

  @Column("numeric", {
    name: "cantidad_critica",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadCritica: string | null;

  @Column("numeric", {
    name: "cantidad_minima",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadMinima: string | null;

  @Column("numeric", {
    name: "cantidad_baja",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadBaja: string | null;

  @Column("numeric", {
    name: "cantidad_oc",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  cantidadOc: string | null;

  @Column("character varying", {
    name: "ubicacion",
    nullable: true,
    length: 100,
  })
  ubicacion: string | null;

  @Column("character varying", { name: "estado", length: 1 })
  estado: string;

  @ManyToOne(() => InvBodega, (invBodega) => invBodega.invArticuloBodegas)
  @JoinColumn([{ name: "id_bodega", referencedColumnName: "id" }])
  idBodega: InvBodega;

  @ManyToOne(() => InvItem, (invItem) => invItem.invArticuloBodegas)
  @JoinColumn([{ name: "id_item", referencedColumnName: "id" }])
  idItem: InvItem;
}
