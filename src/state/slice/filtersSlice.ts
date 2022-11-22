import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IFilterState {
  filters: string[];
}
const initialState: IFilterState = {
  filters: [],
};
export const filtersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addFilters(state, action: PayloadAction<string[]>) {
      state.filters.push(...action.payload);
      state.filters = Array.from(new Set(state.filters));
    },
    deleteFilter(state, action: PayloadAction<string>) {
      state.filters = state.filters.filter((item) => item != action.payload);
    },
  },
});

export default filtersSlice.reducer;
