import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import Product from '@modules/users/infra/typeorm/entities/User';

import productsList from '../helpers/productsList';

export default class CreateProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsList)
      .execute();
  }
}
