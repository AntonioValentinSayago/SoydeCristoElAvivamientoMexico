import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "members",
  timestamps: false,
})
export class Member extends Model<Member> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombres!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apellido_paterno!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apellido_materno!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
    min: 0,
    max: 130,
  },
  })
  edad!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  curp!: string | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  fecha_nacimiento!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  bautizado!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nivel_academico!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  fecha_conversion!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ocupacion!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  cursos!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  iglesia_anterior!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  razon_salida!: string | null;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  talentos_json!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  correo!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  telefono!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tipo_sangre!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  estado_civil!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genero!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at!: Date;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  ministerios_json!: string[];

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  cobertura!: boolean;
}