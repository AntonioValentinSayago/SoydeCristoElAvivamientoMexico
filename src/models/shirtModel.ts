import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
} from "sequelize-typescript";

export type AttendanceOption = "si" | "no";

@Table({
  tableName: "event_registrations",
  timestamps: true,
})
class EventRegistration extends Model<EventRegistration> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(30))
  declare folio: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  declare fullName: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(20))
  declare phone: string;

  // 🔥 Iglesia (ya lo tenías pero bien definido con mapping)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
    field: "churchname", // 👈 columna real en PostgreSQL
  })
  declare churchName: string;

  @AllowNull(false)
  @Column(DataType.ENUM("si", "no"))
  declare willAttend: AttendanceOption;

  // 🔥 NUEVO: si viene acompañado
  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    field: "hascompanions",
  })
  declare hasCompanions: boolean;

  // 🔥 NUEVO: cantidad de acompañantes
  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER,
    field: "companionscount",
  })
  declare companionsCount: number;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  declare checkedIn: boolean;
}

export default EventRegistration;