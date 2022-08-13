import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { menu } from '../../constants/ui'

const { CONTENT_MENUS, GALLERY_MENUS, DASHBOARD_MENUS } = menu
const initialState = {
  configre: {
    cameraControls: {
      value: null,
      data: []
    },
    selectedTrimValue: null,
    selectedExterior: null,
    selectedInterior: null,
    showComments: false
  },
  slider: {
    data: []
  },
  menu: {
    status: CONTENT_MENUS || GALLERY_MENUS || DASHBOARD_MENUS
  },
  saveComments: []
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCameraControl: (state, action) => {
      state.configre.cameraControls = {
        ...state.configre.cameraControls,
        ...action.payload
      }
    },
    setSelectedTrimValue: (state, action) => {
      state.configre.selectedTrimValue = action.payload
    },
    setSelectedExterior: (state, action) => {
      state.configre.selectedExterior = action.payload
    },
    setSelectedInterior: (state, action) => {
      state.configre.selectedInterior = action.payload
    },
    setImagesFromCDN: (state, action) => {
      state.slider.data = action.payload
    },
    clearState: (state, action) => {
      state.slider.data = []
    },
    clickMenu: (state, action) => {
      state.menu.data = action.payload
    },
    loadAllComments: (state, action) => {
      const comments = action.payload.map(index => index.data);
      state.saveComments = [...comments]
    },
    setSaveComments: (state, action) => {
      const newComment = action.payload
      const existingComments = JSON.parse(JSON.stringify(state.saveComments))
      state.saveComments = [...existingComments, newComment]
      
    },
    setShowComments: (state, action) => {
      state.configre.showComments = action.payload
    }
  }
})

export const fetchImagesFromCDN = createAsyncThunk(
  'admin/fetchImages',
  async (
    { brand, productName, interiorColor, exteriorColor, trim, latestVersion, year },
    thunkAPI
  ) => {
    return fetch(
      `${
        process.env.REACT_APP_HMA_CDN_URL
      }&product__name=${productName}&intcolor=${
        interiorColor || ''
      }&extcolor=${exteriorColor}&fsc=${trim}&year=${year}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        thunkAPI.dispatch(
          uiSlice.actions.setImagesFromCDN(
            data.results.filter(
              (item) => parseFloat(item.latest_version) === latestVersion
            )
          )
        )
      })
      .catch((error) => {
        // handle error
        console.log('error', error)
      })
  }
)

export const fetchProjectComments = createAsyncThunk(
  'admin/fetchProjectComments',
  async ({ projectID }, thunkAPI) => {
    return fetch(`${process.env.REACT_APP_HISTORY_URL}/v1/history/${projectID}`)
      .then((resp) => resp.json())
      .then((data) => {
        thunkAPI.dispatch(uiSlice.actions.loadAllComments([...data.data]))
      })
      .catch((error) => {
        // handle error
        console.log('error', error)
      })
  }
)

export const saveProjectComments = createAsyncThunk(
  'admin/saveProjectComments',
  async ({ projectID, newComment }, thunkAPI) => {
    return axios.post(`${process.env.REACT_APP_HISTORY_URL}/v1/history/${projectID}`, { data: {...newComment} })
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
  }
)

const { actions, reducer } = uiSlice
export const {
  setCameraControl,
  setSelectedTrimValue,
  setSelectedInterior,
  setSelectedExterior,
  loadAllComments,
  setSaveComments,
  setShowComments,
  clearState,
  clickMenu
} = actions

export default reducer
