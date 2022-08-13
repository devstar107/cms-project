import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import apiClient from "../../api/apiClient";
import authAPI from '../../api/authAPI'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from '../../utils/localAuth'
import { createBrowserHistory } from 'history'
import { setDisplayNotificationBar } from '../notificationBar/notificationBarSlice'
const history = createBrowserHistory()

const initialState = {
  isSignedIn: !!getAccessToken(),
  isFetching: false,
  // isSuccess: false,
  isError: false,
  errorMessage: ''
}

export const signinUser = createAsyncThunk(
  'auth/signin',
  async (params, thunkAPI) => {
    const { email, password } = params

    return authAPI
      .authSignIn({ email, password })
      .then(({ data, status }) => {
        if (status === 200 && data.status != false) 
        {
          if(data.data.tok)
          {
            setAccessToken(data.data.tok)
            thunkAPI.dispatch(authSlice.actions.signIn())
            return data
          }     
        } else {
          thunkAPI.dispatch(setDisplayNotificationBar("AuthSignIn failed. Invalid Email or Password"))
          return thunkAPI.rejectWithValue(data)
        }
      })
      .catch((error) => {
        thunkAPI.rejectWithValue(error.response.data)
        throw new Error(error.response.data)
      })
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isSignedIn = true
      history.push('/projects')
    },
    signOut: (state) => {
      removeAccessToken()
      // state = { ...state, isSignedIn: false };
      state.isSignedIn = false
      history.push('/')
    },
    setUser: (state, action) => {
      state.profile = action.payload
    }
  },
  extraReducers: {
    [signinUser.fulfilled]: (state, action) => {
      // state.email = payload.email;
      // state.username = action.payload.name;
      state.isFetching = false
      // state.isSuccess = true;
      // state.isSignedIn = true;
      return state
    },
    [signinUser.pending]: (state) => {
      state.isFetching = true
    },
    [signinUser.rejected]: (state, action) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = action.error
    }
  }
})

const { actions, reducer } = authSlice
export const { signIn, signOut, setUser } = actions

export default reducer
