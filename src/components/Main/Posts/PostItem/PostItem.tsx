import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost } from '../../../../interfaces/interfaces';
import { postsSlice } from '../../../../state/slice/postsSlice';
import { AppDispatch, RootState } from '../../../../state/store/store';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import styles from './PostItem.module.scss';
import { extractTags } from '../../../../util/util';
interface IPostItemProps {
  data: IPost;
}
export const PostItem: React.FC<IPostItemProps> = (props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [isActive, setActive] = useState(true);
  const [text, setText] = useState(props.data.text);
  const [tags, setTags] = useState(props.data.tags);
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filtersReducer.filters);
  const { deletePost, updatePost } = postsSlice.actions;
  useEffect(() => {
    setActive(false);
    if (!filters.length) setActive(true);
    filters.forEach((tag) => {
      if (tags.map((item) => item.toLowerCase()).includes(tag.toLowerCase())) setActive(true);
    });
  }, [filters]);
  const handleInput = (value: string) => {
    setText(value);
    setTags(extractTags(value));
  };
  const submitEdit = () => {
    setEditMode(false);
    dispatch(updatePost({ id: props.data.id, text: text, tags: tags }));
  };
  const item = (
    <div className={styles.item}>
      {!isEditMode && <div className={styles.text}>{text}</div>}
      {isEditMode && (
        <div className={styles.edit}>
          <HighlightWithinTextarea value={text} onChange={handleInput} highlight={tags} />
        </div>
      )}
      <div className={styles.container}>
        {tags.map((item) => (
          <div className={styles.tag} key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.menu}>
        <button onClick={() => dispatch(deletePost(props.data.id))} className={styles.button}>
          Удалить
        </button>
        {!isEditMode && (
          <button onClick={() => setEditMode(true)} className={styles.button}>
            Редактировать
          </button>
        )}
        {isEditMode && (
          <button onClick={submitEdit} className={styles.button}>
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
  return <>{isActive && item}</>;
};
