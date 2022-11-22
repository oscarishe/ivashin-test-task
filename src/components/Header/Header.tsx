import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header>
      <h1 className={styles.title}>#UBlog</h1>
    </header>
  );
};
