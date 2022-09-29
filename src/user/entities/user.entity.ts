import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CatEntity } from '../../cat/cat.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20 })
  age: string;

  @OneToOne((type) => CatEntity)
  @JoinColumn()
  cat: CatEntity;
}
