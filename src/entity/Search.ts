import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class Search {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: string;

  @Column()
  resultsCount: number;

  @CreateDateColumn({
    type: "timestamp",
    name: "done_at",
    default: () => "LOCALTIMESTAMP",
  })
  done_at: string;
}
