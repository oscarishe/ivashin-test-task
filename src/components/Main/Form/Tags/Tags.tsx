import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSlice } from '../../../../state/slice/filtersSlice';
import { AppDispatch, RootState } from '../../../../state/store/store';
import { FilterItem } from './FilterItem/FilterItem';
import styles from './Tags.module.scss';
export const Tags: React.FC = () => {
  const [tags, setTags] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { addFilters } = filtersSlice.actions;
  const filters = useSelector((state: RootState) => state.filtersReducer.filters);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value);
  const submitFilters = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tags.trim().length) return;
    const newFilters = tags
      .trim()
      .split(' ')
      .map((item) => `#${item}`);
    dispatch(addFilters(newFilters));
    setTags('');
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Фильтр по тегам</h3>
      <form onSubmit={submitFilters} className={styles.form}>
        <input type="text" value={tags} onChange={handleInput} className={styles.form__input} />
        <div className={styles.form__prompt}>
          Введите слова-фильтры через пробел и нажмите Enter
        </div>
      </form>
      <div className={styles.filters}>
        {filters.map((item) => (
          <FilterItem key={item} tag={item} />
        ))}
      </div>
    </div>
  );
};
