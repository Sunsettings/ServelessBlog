import {Schema} from '../entity/schema'

export default{
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'rm-bp1v1upv24bmyucv0zo.mysql.rds.aliyuncs.com',
        port: 3306,
        username: 'root',
        password: 'Qulinbo020618',
        database: 'blog',
        synchronize: true,
        logging: false,

        entities: [Schema],
      }
    }
  },
}