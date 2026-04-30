import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'members',
  timestamps: false, // puedes cambiar a true si manejarás updatedAt
})
export class Member extends Model<Member> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  nombres!: string;

  @Column(DataType.STRING)
  apellido_paterno!: string;

  @Column(DataType.STRING)
  apellido_materno!: string;

  @Column(DataType.INTEGER)
  edad!: number;

  @Column(DataType.STRING)
  curp!: string;

  @Column(DataType.DATEONLY)
  fecha_nacimiento!: string;

  @Column(DataType.BOOLEAN)
  bautizado!: boolean;

  @Column(DataType.STRING)
  nivel_academico!: string;

  @Column(DataType.DATEONLY)
  fecha_conversion!: string;

  @Column(DataType.STRING)
  ocupacion!: string;

  @Column(DataType.JSON)
  cursos!: string[];

  @Column(DataType.STRING)
  iglesia_anterior!: string;

  @Column(DataType.TEXT)
  razon_salida!: string;

  @Column(DataType.JSON)
  talentos_json!: string[];

  @Column(DataType.STRING)
  correo!: string;

  @Column(DataType.STRING)
  telefono!: string;

  @Column(DataType.STRING)
  tipo_sangre!: string;

  @Column(DataType.STRING)
  estado_civil!: string;

  @Column(DataType.STRING)
  genero!: string;

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date;

  @Column(DataType.JSON)
  ministerios_json!: string[];

  @Column(DataType.BOOLEAN)
  cobertura!: boolean;
}