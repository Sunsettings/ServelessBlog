import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Schema } from '../entity/schema'
import { Repository } from 'typeorm';

//使用了依赖注入和控制翻转等IOC
@Provide()
export class SchemaService {
    // 向数据库新增一条数据
    
    @InjectEntityModel(Schema)
    schemaModel: Repository<Schema>;

    async save(schemaStr:string ) {
        const schema = new Schema();
        schema.schema = schemaStr;

        const result = await this.schemaModel.save(schema);
        return result;

    }

    async getLatestOne() {
        const schema = await this.schemaModel.findOne({
            select:['schema'],
            where: {},
            order:{id:'DESC'}
        });
        
        return schema;

    }
}