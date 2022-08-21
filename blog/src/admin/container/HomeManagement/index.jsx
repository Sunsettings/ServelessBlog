import { Button, message } from 'antd';
import React from 'react';
import request from '../../../common/request'
import { parseJsonByString } from '../../../common/utils';
import AreaList from './component/AreaList';
import { useSchemaData } from '../../hook/useSchemaData';

import styles from './style.module.scss'


const HomeManagement = () => {

  const { schema, changeSchema } = useSchemaData();

  const handleResetBtnClick = () => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
    })
  }

  const handleSaveBtnClick = () => {
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    }).then(() => { })
    message.info('保存成功', [1])
  }
  return (
    <div>
      <AreaList children={schema.children || []} />
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>保存区块设置</Button>
        <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置区块设置</Button>
      </div>
    </div> 
  );
};

export default HomeManagement;