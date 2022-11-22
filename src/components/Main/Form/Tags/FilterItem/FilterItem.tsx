import { useDispatch } from 'react-redux';
import { filtersSlice } from '../../../../../state/slice/filtersSlice';
import { AppDispatch } from '../../../../../state/store/store';
import styles from './FilterItem.module.scss';
interface IFilterItemProps {
  tag: string;
}

export const FilterItem: React.FC<IFilterItemProps> = (props) => {
  const { deleteFilter } = filtersSlice.actions;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.tag}>
      <div>{props.tag}</div>
      <button className={styles.tag__remove} onClick={() => dispatch(deleteFilter(props.tag))}>
        X
      </button>
    </div>
  );
};
