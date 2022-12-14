import { useState, useEffect } from 'react'
import { Button, Modal, Select } from "antd"
import { SortableElement } from 'react-sortable-hoc'
import { cloneDeep } from 'lodash'
import { useSchemaData } from '../../../../hook/useSchemaData'

import Banner from './component/Banner'
import Footer from './component/Footer'
import List from './component/List'

import styles from './style.module.scss'

const { Option } = Select;
const map = { Banner, Footer, List };

const AreaItem = (props) => {
  const { value: index } = props;
  const { pageChild, changePageChild, removePageChild } = useSchemaData(index);

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tempPageChild, setTempPageChild] = useState(cloneDeep(pageChild))

  useEffect(() => {
    setTempPageChild(cloneDeep(pageChild));
  }, [pageChild])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    changePageChild(tempPageChild);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTempPageChild(cloneDeep(pageChild));
  };

  const handleSelectorChange = (value) => {
    setTempPageChild({ name: value, attributes: {}, children: [] })
  }

  const changeTempPageChildAttributes = (kvObj) => {
    const newTempPageChild = {...tempPageChild};
    for (let key in kvObj) {
      newTempPageChild.attributes[key] = kvObj[key];
    }
    setTempPageChild(newTempPageChild)
  }

  const changeTempPageChildChildren = (children) => {
    const newTempPageChild = { ...tempPageChild };
    newTempPageChild.children = children;
    setTempPageChild(newTempPageChild)
  }

  const getComponent = () => {
    const { name } = tempPageChild;
    const Component = map[name];
    return Component ? <Component {...tempPageChild} changeAttributes={changeTempPageChildAttributes} changeChildren={changeTempPageChildChildren}

    /> : null;
  }

  return (
    <li className={styles.item}>
      <span className={styles.content} onClick={showModal}>{pageChild.name ? pageChild.name + ' ??????' : '????????????????????????'}</span>
      <span className={styles.delete}>
        <Button size="small" type="dashed" onClick={removePageChild}
          danger
        >
          ??????
        </Button>
      </span>
      <Modal title="????????????" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel} bodyStyle={{maxHeight:400,overflowY:'scroll'}}>
        <Select className={styles.selector} value={tempPageChild.name} style={{ width: '100%' }} onChange={handleSelectorChange}>
          <Option value='Banner'>Banner ??????</Option>
          <Option value='List'>List ??????</Option>
          <Option value='Footer'>Footer ??????</Option>
        </Select>
        {getComponent()}
      </Modal>

    </li>
  )

}

export default SortableElement(AreaItem);