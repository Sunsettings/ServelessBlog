import { Provide,Inject,Get,Controller,Post,Body,ALL,Headers} from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { Context } from '@midwayjs/faas';
import { SchemaService} from '../service/schema'
import { SchemaSaveDTO } from '../dto/schema';
import { ErrorMiddleware } from '../middleware/error';
import { getStandardResponse, getLoginUser } from '../util/common';

//使用了依赖注入和控制翻转等IOC
@Provide()
@Controller('/api/schema/',{middleware:[ErrorMiddleware]})
export class SchemaController {
  @Inject()
  ctx: Context;

  @Inject()
  schemaService: SchemaService;

  @Get('/getLatestOne') 
  async getLatestone() {
      const result = await this.schemaService.getLatestOne();
      return getStandardResponse(true, result);
  }

  @Post('/save')
  @Validate()
  async save(@Body(ALL) bodyObj: SchemaSaveDTO, @Headers('token') token: string) {
    const user = await getLoginUser(token);
    if(user?.username === 'Qulinbo')
    {
      const result = await this.schemaService.save(bodyObj.schema);
      return getStandardResponse(true, result);
    }else {
      return getStandardResponse(false, null,'您没有保存权限');
    }

  }
}
