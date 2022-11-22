import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postsSlice } from '../../../../state/slice/postsSlice';
import { AppDispatch } from '../../../../state/store/store';
import { extractTags } from '../../../../util/util';
import styles from './PostInput.module.scss';

export const PostInput: React.FC = () => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isErrror, setError] = useState(false);
  const { addPost } = postsSlice.actions;
  const dispatch = useDispatch<AppDispatch>();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setError(false);
    setTags(extractTags(e.target.value));
  };
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim().length) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(addPost({ id: new Date().getTime(), text: text.trim(), tags: extractTags(text) }));
    setText('');
    setTags([]);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>О чем вы думаете?</h2>
      <form onSubmit={submitForm} className={styles.form}>
        <textarea className={styles.form__input} onChange={handleInput} value={text}></textarea>
        {isErrror && <div className={styles.form__error}>Пост не может быть пустым</div>}
        <input className={styles.form__submit} type="submit" />
      </form>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <div className={styles.tag} key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
