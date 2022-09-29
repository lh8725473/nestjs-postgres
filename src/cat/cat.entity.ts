import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('cat', { schema: 'dw' })
@Entity('cat')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;
}
