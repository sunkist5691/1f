import logger from 'redux-logger'
import { User, Job, Profile } from './type'
import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

// slices
const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    addOrUpdate: (state, { payload }: PayloadAction<User>) => payload,
    logout: (state, { payload }: PayloadAction<null>) => payload,
  },
})

const preUserSlice = createSlice({
  name: 'preuser',
  initialState: null,
  reducers: {
    addPreUser: (state, { payload }: PayloadAction<any>) => payload,
  },
})

const currentVideoSlice = createSlice({
  name: 'currentVideo',
  initialState: null,
  reducers: {
    addCurrentVideo: (state, { payload }: PayloadAction<any>) => payload,
  },
})

const jobSlice = createSlice({
  name: 'job',
  initialState: null as Job | null,
  reducers: {
    createOrUpdate: (state, { payload }: PayloadAction<Job | null>) => payload,
    addApplicant: (state, { payload }: PayloadAction<Profile>) => {
      if (state) state.applicants.push(payload)
    },
    remove: (state) => null,
  },
  extraReducers: {
    [userSlice.actions.logout.type]: (state) => null,
  },
})

const profileSlice = createSlice({
  name: 'profile',
  initialState: null as Profile | null,
  reducers: {
    createOrUpdate: (state, { payload }: PayloadAction<Profile | null>) =>
      payload,
    addApplied: (state, { payload }: PayloadAction<Job>) => {
      if (state) state.applied.push(payload)
    },
    editApplied: (state, { payload }: PayloadAction<Job>) => {
      if (state) {
        const filtered = state.applied.filter(
          (job) => job.userId !== payload.userId,
        )
        state.applied = [...filtered, payload]
      }
    },
    remove: (state) => null,
  },
  extraReducers: {
    [userSlice.actions.logout.type]: (state) => null,
  },
})

const jobAllSlice = createSlice({
  name: 'jobAll',
  initialState: null as Job[] | null,
  reducers: {
    saveAllJobs: (state, { payload }: PayloadAction<Job[]>) => payload,
  },
})

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    searchWord: (state, { payload }: PayloadAction<string>) => payload,
  },
  extraReducers: {
    [userSlice.actions.logout.type]: (state) => '',
  },
})

// actions
export const {
  addOrUpdate: createOrUpdateUserActionCreator,
  logout: logoutActionCreator,
} = userSlice.actions

export const { addPreUser: addPreUserActionCreator } = preUserSlice.actions
export const {
  addCurrentVideo: currentVideoActionCreator,
} = currentVideoSlice.actions

export const {
  createOrUpdate: postOrEditProfileActionCreator,
  remove: removeProfileActionCreator,
  addApplied: addAppliedActionCreator,
  editApplied: editAppliedActionCreator,
} = profileSlice.actions

export const {
  createOrUpdate: postOrEditJobActionCreator,
  remove: removeJobActionCreator,
  addApplicant: addApplicantActionCreator,
} = jobSlice.actions

export const { saveAllJobs: saveAllJobsActionCreator } = jobAllSlice.actions
export const { searchWord: searchWordActionCreator } = searchSlice.actions

// combining reducers
const reducer = combineReducers({
  user: userSlice.reducer,
  preUser: preUserSlice.reducer,
  currentVideo: currentVideoSlice.reducer,
  job: jobSlice.reducer,
  profile: profileSlice.reducer,
  jobAll: jobAllSlice.reducer,
  search: searchSlice.reducer,
})

// middleware
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
})
