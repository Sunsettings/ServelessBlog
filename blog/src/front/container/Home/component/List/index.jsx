import styles from './style.module.scss'

const List = ({ schema }) => {
  const { children = {} } = schema;
  return (
    <div className={styles.courses}>
      <ul className={styles.list}>
        {
          children.map((item, index) => {
            const {attributes = {}} = item;
            const { title, description, imageUrl, link} = attributes;
            return(
            <li className={styles.item} key={index}>
              <a href={link} target="_blank" rel='noreferrer' className={styles.link}>
                <img className={styles.img} src={imageUrl} alt={title} />
                <h4 className={styles.title}>{title || '暂无标题'}</h4>
                <p className={styles.desc}>{description || '暂无内容'}</p>
              </a>
            </li>
          )
          })
        }
      </ul>
    </div>
  );
}

export default List;
