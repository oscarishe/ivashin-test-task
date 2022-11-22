import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { IPost } from '../../interfaces/interfaces';
interface IPostState {
  posts: IPost[];
}
const initialState: IPostState = {
  posts: data,
};
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<IPost>) {
      state.posts.push(action.payload);
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((item) => item.id != action.payload);
    },
    updatePost(state, action: PayloadAction<IPost>) {
      const editIndex = state.posts.map((item) => item.id).indexOf(action.payload.id);
      state.posts[editIndex] = action.payload;
    },
  },
});

export default postsSlice.reducer;
