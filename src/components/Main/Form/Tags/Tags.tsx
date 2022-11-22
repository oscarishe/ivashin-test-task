import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSlice } from '../../../../state/slice/filtersSlice';
import { AppDispatch, RootState } from '../../../../state/store/store';
import { FilterItem } from './FilterItem/FilterItem';

export const Tags: React.FC = () => {
  const [tags, setTags] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { addFilters } = filtersSlice.actions;
  const filters = useSelector((state: RootState) => state.filtersReducer.filters);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value);
  const submitFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = tags.split(' ').map((item) => `#${item}`);
    dispatch(addFilters(newFilters));
    setTags('');
  };
  return (
    <div>
      <h3>Фильтр по тегам</h3>
      <form onSubmit={submitFilters}>
        <input type="text" value={tags} onChange={handleInput} />
      </form>
      <div>
        {filters.map((item) => (
          <FilterItem key={item} tag={item} />
        ))}
      </div>
    </div>
  );
};
