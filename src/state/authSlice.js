import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from 'api'
import {
  localAuthenticate,
  removeAccessToken,
  setAccessToken
} from 'utils/localAuth'

export const signup = createAsyncThunk(
  'auth/signup',
  ({ email, first_name, last_name, password1, password2, onComplete }) => {
    return API.userRegistration
      .signup({ email, first_name, last_name, password1, password2 })
      .then(({ data }) => {
        onComplete(null, data)
        return data
      })
      .catch((error) => {
        onComplete(error.response.data, null)
        throw new Error(error.response.data)
      })
  }
)

export const activate = createAsyncThunk(
  'auth/activate',
  ({ key, onComplete }) => {
    return API.userRegistration
      .activate(key)
      .then(({ data }) => {
        onComplete(null, data)
        return data
      })
      .catch((error) => {
        onComplete(error.response.data, null)
        throw new Error(error.response.data)
      })
  }
)

export const signin = createAsyncThunk(
  'auth/signin',
  ({ username, password, onComplete }, { dispatch }) => {
    return API.userRegistration
      .signin({ username, password })
      .then(({ data }) => {
        setAccessToken(data.token)
        dispatch(authSlice.actions.localAuthenticate())
        onComplete(null, data)
        return data
      })
      .catch((error) => {
        onComplete(error.response.data, null)
        throw new Error(error.response.data)
      })
  }
)

export const changePassword = createAsyncThunk(
  'auth/password-change',
  ({ old_password, new_password1, new_password2, onComplete }) => {
    return API.userRegistration
      .changePassword({
        old_password,
        new_password1,
        new_password2
      })
      .then(({ data }) => {
        onComplete(null, data)
        return data
      })
      .catch((error) => {
        onComplete(error.response.data, null)
        throw new Error(error.response.data)
      })
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  ({ email, onComplete }) => {
    return API.userRegistration
      .resetPassword({ email })
      .then(({ data }) => {
        onComplete(null, data)
        return data
      })
      .catch((error) => {
        onComplete(error.response.data, null)
        throw new Error(error.response.data)
      })
  }
)

export const confirmResetPassword = createAsyncThunk(
  'auth/confirmResetPassword',
  ({ activation_key, password1, password2, onComplete }) => {
    return API.userRegistration
      .confirmResetPassword({ activation_key, password1, password2 })
      .then(({ data }) => {
        onComplete(null, data)
        return data
      })
      .catch((error) => {
        onComplete(error.response.data, null)
        throw new Error(error.response.data)
      })
  }
)

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    authState: {
      ...localAuthenticate()
    },
    signup: {
      submitting: false,
      errors: {}
    },
    activation: {
      activating: false
    },
    signin: {
      submitting: false,
      errors: {}
    },
    changePassword: {
      submitting: false,
      errors: {}
    },
    resetPassword: {
      submitting: false,
      error: {}
    },
    confirmResetPassword: {
      submitting: false,
      error: {}
    }
  },
  reducers: {
    localAuthenticate (state) {
      state.authState = localAuthenticate()
    },
    logout (state) {
      removeAccessToken()
      state.authState = localAuthenticate()
    }
  },
  extraReducers: {
    // signup
    [signup.fulfilled] (state) {
      state.signup.submitting = false
    },
    [signup.pending] (state) {
      state.signup.submitting = true
    },
    [signup.rejected] (state, action) {
      state.signup.submitting = false
      state.signup.errors = action.error
    },
    // activation
    [activate.pending] (state) {
      state.activation.activating = true
    },
    [activate.fulfilled] (state) {
      state.activation.activating = false
    },
    [activate.rejected] (state) {
      state.activation.activating = false
    },
    // sign-in
    [signin.pending] (state) {
      state.signin.submitting = true
    },
    [signin.fulfilled] (state) {
      state.signin.submitting = false
    },
    [signin.rejected] (state) {
      state.signin.submitting = false
    },
    // change-password
    [changePassword.pending] (state) {
      state.changePassword.submitting = true
    },
    [changePassword.fulfilled] (state) {
      state.changePassword.submitting = false
    },
    [changePassword.rejected] (state) {
      state.changePassword.submitting = false
    },
    // reset password
    [resetPassword.pending] (state) {
      state.resetPassword.submitting = true
    },
    [resetPassword.fulfilled] (state) {
      state.resetPassword.submitting = false
    },
    [resetPassword.rejected] (state, action) {
      state.resetPassword.submitting = false
      state.resetPassword.errors = action.error
    },
    // confirm reset password
    [confirmResetPassword.pending] (state) {
      state.confirmResetPassword.submitting = true
    },
    [confirmResetPassword.fulfilled] (state) {
      state.confirmResetPassword.submitting = false
    },
    [confirmResetPassword.rejected] (state, action) {
      state.confirmResetPassword.submitting = false
      state.confirmResetPassword.errors = action.error
    }
  }
})

export const actions = {
  ...authSlice.actions,
  signin,
  signup,
  activate,
  changePassword,
  resetPassword,
  confirmResetPassword
}

export default authSlice.reducer
