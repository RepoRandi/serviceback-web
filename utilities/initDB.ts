import 'reflect-metadata';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

import entities from '../server/src/entities';
// HYGEN-IMPORT

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {},
): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    // prettier-ignore
    entities,
    migrations: ['migrations/*.ts'],
    ...optionOverrides,
  };

  const connection = await createConnection(options);

  return connection;
};

export default initializeDatabase;
