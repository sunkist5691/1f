import logger from 'redux-logger'
import { User } from './type'
import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

// initialStates

// slices
const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    addOrUpdate: (state, { payload }: PayloadAction<User>) => payload,
    logout: (state, { payload }: PayloadAction<null>) => payload,
  },
})

// actions
export const {
  addOrUpdate: createOrUpdateUserActionCreator,
  logout: logoutActionCreator,
} = userSlice.actions

// combining reducers
const reducer = combineReducers({
  user: userSlice.reducer,
})

// middleware
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
