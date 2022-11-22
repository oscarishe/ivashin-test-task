import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postsSlice } from '../../../../state/slice/postsSlice';
import { AppDispatch } from '../../../../state/store/store';
import { extractTags } from '../../../../util/util';
import styles from './PostInput.module.scss';

export const PostInput: React.FC = () => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { addPost } = postsSlice.actions;
  const dispatch = useDispatch<AppDispatch>();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setTags(extractTags(e.target.value));
  };
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(new Date().getTime());
    dispatch(addPost({ id: new Date().getTime(), text: text, tags: extractTags(text) }));
    setText('');
    setTags([]);
  };
  return (
    <div>
      <h2>О чем вы думаете?</h2>
      <form onSubmit={submitForm}>
        <textarea onChange={handleInput} value={text}></textarea>
        <input type="submit" />
      </form>
      <div className={styles.container}>
        {tags.map((tag) => (
          <div className={styles.tag} key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
