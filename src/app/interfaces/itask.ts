export enum PriorityLevel {
  High,
  Medium,
  Low,
}

export enum ProgressLevel {
  Pending,
  Started,
  Completed,
}

export interface Itask {
  id: number;
  title: String;
  description: String;
  category: String;
  task_date: Date;
  priority_level: string;
  progress_level: string;
}

//   priority_level: {
//     type: DataTypes.ENUM("High", "Low", "Medium"),
//     allowNull: false,
//   },
//   progress_level: {
//     type: DataTypes.ENUM("Pending", "Started", "Completed"),
//   },
