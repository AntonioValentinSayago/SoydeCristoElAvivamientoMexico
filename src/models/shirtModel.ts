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

  // 🔥 NUEVO CAMPO
  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare churchName: string;

  @AllowNull(false)
  @Column(DataType.ENUM("si", "no"))
  declare willAttend: AttendanceOption;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  declare checkedIn: boolean;
}

export default EventRegistration;