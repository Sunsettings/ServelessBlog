import { Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import * as orm from '@midwayjs/typeorm';
import * as validate from '@midwayjs/validate';
import * as faas from '@midwayjs/faas';
import { join } from 'path'

@Configuration({
  imports: [orm,validate,faas],
  importConfigs: [join(__dirname,'./config/')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  async onReady() {}
}
