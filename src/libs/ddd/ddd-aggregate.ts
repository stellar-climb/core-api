import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DddAggregate {
  @CreateDateColumn()
  private createdAt!: Date;

  @Column()
  private createdBy!: string;

  @UpdateDateColumn()
  private updatedAt!: Date;

  @Column()
  private updatedBy!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }
}
