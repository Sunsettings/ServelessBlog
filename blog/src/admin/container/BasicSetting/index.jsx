import { Button, message, Input } from 'antd';
import React, { useCallback } from 'react';
import request from '../../../common/request';
import { useSchemaData } from '../../hook/useSchemaData';
import { parseJsonByString } from '../../../common/utils';

import styles from './style.module.scss'

const BasicSetting = () => {

    const { schema = {}, changeSchema, changePageAttribute } = useSchemaData();
    const {attributes = {}} = schema;
    const { title = '', icon = '' } = attributes;

    const handleResetBtnClick = () => {
        request.get('/api/schema/getLatestOne').then((response) => {
            const data = response?.data;
            data && changeSchema(parseJsonByString(data.schema, {}));
        })
    }

    const handleSaveBtnClick = () => {
        request.post('/api/schema/save',{
            schema:JSON.stringify(schema)            
        }).then(() => {})
        window.localStorage.schema = JSON.stringify(schema);
        message.info('保存成功', [1])
    }

    const handleTitleChange = useCallback((e) => {
        changePageAttribute('title',e.target.value); 
    },[changePageAttribute]);

    const handleIconChange = useCallback((e) => {
        changePageAttribute('icon',e.target.value);
    },[changePageAttribute]);

    return (
        <div>
            <div className={styles.row}>
                <div className={styles.title}>页面标题:</div>
                <div className={styles.content}>
                    <Input value={title} onChange={handleTitleChange} />
                </div>
            </div>
            <br />
            <div className={styles.row}>
             <div className={styles.title}>页面图标链接:</div>
             <div className={styles.content}>
                <Input value={icon} onChange={handleIconChange}></Input>
             </div>
            </div>
            <div className={styles.buttons}>
                <Button type="primary" onClick={handleSaveBtnClick}>保存基础设置</Button>
                <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置基础设置</Button>
            </div>
        </div>
    );
};

export default BasicSetting;