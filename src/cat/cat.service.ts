import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';
import { CatEntity } from './cat.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }

  findAll(): Cat[] {
    return this.cats;
  }

  async create(cat): Promise<CatEntity> {
    return await this.catRepository.save(cat);
  }

  async update(cat: CatEntity): Promise<CatEntity> {
    await this.catRepository.update(cat.id, cat);
    return await this.catRepository.findOneBy({
      id: cat.id,
    });
  }

  // async findById(id): Promise<CatEntity[]> {
  //   return await this.postsRepository.findByIds([id]);
  // }

  async findById(id): Promise<CatEntity> {
    return await this.catRepository.findOneBy({
      id: id,
    });
  }

  // public async getAll() {
  //   return await this.catRepository.find();
  // }

  public async getAll() {
    return await this.connection.query(`SELECT * FROM dw.d_dim_ph_doctor_info`);
  }

  /**
   * 条件查询
   * @param query
   * @returns
   */
  public async getQuery(query) {
    const qb = await this.catRepository.createQueryBuilder('cat');
    qb.where(`title like '%${query.title}%'`);

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }
}
