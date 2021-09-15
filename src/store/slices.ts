import logger from 'redux-logger'
import { User, Job } from './type'
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

const jobSlice = createSlice({
  name: 'job',
  initialState: null as Job | null,
  reducers: {
    createOrUpdate: (state, { payload }: PayloadAction<Job>) => payload,
    remove: (state) => null,
  },
})

const jobAllSlice = createSlice({
  name: 'jobAll',
  initialState: null as Job[] | null,
  reducers: {
    saveAllJobs: (state, { payload }: PayloadAction<Job[]>) => payload,
  },
})

// actions
export const {
  addOrUpdate: createOrUpdateUserActionCreator,
  logout: logoutActionCreator,
} = userSlice.actions

export const {
  createOrUpdate: postOrEditJobActionCreator,
  remove: removeJobActionCreator,
} = jobSlice.actions

export const { saveAllJobs: saveAllJobsActionCreator } = jobAllSlice.actions

// combining reducers
const reducer = combineReducers({
  user: userSlice.reducer,
  job: jobSlice.reducer,
  jobAll: jobAllSlice.reducer,
})

// middleware
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
