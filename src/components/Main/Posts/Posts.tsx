import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store/store';
import { PostItem } from './PostItem/PostItem';
import styles from './Posts.module.scss';
export const Posts: React.FC = () => {
  const posts = useSelector((state: RootState) => state.postReducer.posts);
  return (
    <div>
      <h3 className={styles.title}>Ваши заметки</h3>
      <div className={styles.container}>
        {posts.map((item) => (
          <PostItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
