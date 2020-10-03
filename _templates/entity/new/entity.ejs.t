---
to: server/src/entities/<%= h.changeCase.pascalCase(name) %>.ts
---
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'
import { v4 } from 'uuid'

@Entity()
export class <%= h.changeCase.pascalCase(name) %> {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  // Add attributes here

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @BeforeInsert()
  addId(): void {
    this.id = v4()
  }
}
