import React, { useEffect, useState } from 'react'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authAPI from '../../api/authAPI'
import { Alert } from 'react-bootstrap'
import './Login.scss'
import { useDispatch } from 'react-redux'
import { signinUser } from '../../features/auth/authSlice'
import Button from '../../components/common/Button/Button'
import { createBrowserHistory } from 'history'

import { LogoIcon, ResetIcon } from '../../elements/icons/icons'
import LoginFooter from '../LoginFooter/LoginFooter'
import { setDisplayNotificationBar } from '../../features/notificationBar/notificationBarSlice'
import { validateEmail } from '../../utils/local'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from '../../utils/localAuth'

const Login = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const history = createBrowserHistory()
  const [error, setError] = useState();
  const initialState = {
    isSignedIn: !!getAccessToken(),
    isFetching: false,
    // isSuccess: false,
    isError: false,
    errorMessage: ''
  }
  const handleSubmitLogin = () => {
    const { email, password } = form
    const checkEmail = validateEmail(email)
    if (!checkEmail) {
      setError('Please input correct email address')
    }
    if (!password) {
      setError('Please enter correct credentails')
    }
    checkEmail && password && dispatch(signin(form))
  }

  const signin = createAsyncThunk(
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
            setError("AuthSignIn failed. Invalid Email or Password")
            return thunkAPI.rejectWithValue(data)
          }
        })
        .catch((error) => {
          thunkAPI.rejectWithValue(error.response.data)
          throw new Error(error.response.data)
        })
    }
  )

  useEffect(() => {}, [form])

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
  
  const setFormHendler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <div className='login'>
        <div className='logo'>
          <LogoIcon width='75px' />
        </div>
        <div className='login_form'>
          <div className='alert_style'>
            {error && <Alert padding="10px">{error}</Alert>}
          </div>
          <div className='login_input'>
            <input
              type='text'
              name='email'
              placeholder='email'
              onChange={setFormHendler}
              value={form.email}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={setFormHendler}
              value={form.password}
            />
          </div>
          <div className='login_form_reset'>
            <p className='reset-password-text'>Reset password</p>
            <Button
              className='btnFormSubmitLogin'
              onClick={handleSubmitLogin}
              icon={<ResetIcon />}
            />
          </div>
        </div>
      </div>
      <LoginFooter />
    </>
  )
}

export default Login
