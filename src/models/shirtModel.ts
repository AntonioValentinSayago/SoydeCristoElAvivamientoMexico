import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
} from "sequelize-typescript";

/* =========================
   TYPES - SHIRTS
========================= */

export type ShirtSizeValue = "CH" | "M" | "G" | "XG" | "2XG";

export interface ShirtSizeItem {
  size: ShirtSizeValue;
  stock: number;
}

export interface ShirtImageItem {
  url: string;
  publicId?: string;
}

/* =========================
   TYPES - QUESTIONS
========================= */

export type QuestionDifficulty = "Fácil" | "Media" | "Difícil";

export interface QuestionOption {
  id: string;
  text: string;
}

/* =========================
   MODEL - SHIRTS
========================= */

@Table({
  tableName: "shirts",
  timestamps: true,
})
class Shirts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    validate: {
      notEmpty: true,
      len: [2, 100],
    },
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
    validate: {
      notEmpty: true,
      isDecimal: true,
    },
  })
  declare price: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
    validate: {
      isValidSizes(value: ShirtSizeItem[]) {
        if (!Array.isArray(value)) {
          throw new Error("sizes must be an array");
        }

        for (const item of value) {
          if (!item || typeof item !== "object") {
            throw new Error("each size item must be an object");
          }

          if (
            typeof item.size !== "string" ||
            !["CH", "M", "G", "XG", "2XG"].includes(item.size)
          ) {
            throw new Error("invalid shirt size");
          }

          if (
            typeof item.stock !== "number" ||
            Number.isNaN(item.stock) ||
            item.stock < 0
          ) {
            throw new Error("stock per size must be a valid number >= 0");
          }
        }
      },
    },
  })
  declare sizes: ShirtSizeItem[];

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
    validate: {
      isValidImages(value: ShirtImageItem[]) {
        if (!Array.isArray(value)) {
          throw new Error("images must be an array");
        }

        if (value.length === 0) {
          throw new Error("images must contain at least 1 item");
        }

        for (const item of value) {
          if (!item || typeof item !== "object") {
            throw new Error("each image item must be an object");
          }

          if (typeof item.url !== "string" || !item.url.trim()) {
            throw new Error("image url is required");
          }

          if (
            item.publicId !== undefined &&
            typeof item.publicId !== "string"
          ) {
            throw new Error("publicId must be a string");
          }
        }
      },
    },
  })
  declare images: ShirtImageItem[];

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER,
    validate: {
      isInt: true,
      min: 0,
    },
  })
  declare stock: number;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isActive: boolean;
}

export default Shirts;

/* =========================
   MODEL - QUESTIONS
========================= */

@Table({
  tableName: "questions",
  timestamps: true,
})
export class Question extends Model<Question> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(120),
    validate: {
      notEmpty: true,
      len: [2, 120],
    },
  })
  declare subject: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM("Fácil", "Media", "Difícil"),
    validate: {
      isIn: [["Fácil", "Media", "Difícil"]],
    },
  })
  declare difficulty: QuestionDifficulty;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    validate: {
      notEmpty: true,
    },
  })
  declare question: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
    validate: {
      isValidOptions(value: QuestionOption[]) {
        if (!Array.isArray(value)) {
          throw new Error("options must be an array");
        }

        if (value.length < 2) {
          throw new Error("options must contain at least 2 items");
        }

        for (const option of value) {
          if (!option || typeof option !== "object") {
            throw new Error("each option must be an object");
          }

          if (typeof option.id !== "string" || !option.id.trim()) {
            throw new Error("option id cannot be empty");
          }

          if (typeof option.text !== "string" || !option.text.trim()) {
            throw new Error("option text cannot be empty");
          }
        }
      },
    },
  })
  declare options: QuestionOption[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING(10),
    validate: {
      notEmpty: true,
      len: [1, 10],
      isCorrectAnswerValid(this: Question, value: string) {
        if (!Array.isArray(this.options)) return;

        const exists = this.options.some((option) => option.id === value);

        if (!exists) {
          throw new Error("correctAnswer must exist inside options");
        }
      },
    },
  })
  declare correctAnswer: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    validate: {
      notEmpty: true,
    },
  })
  declare explanation: string;
}