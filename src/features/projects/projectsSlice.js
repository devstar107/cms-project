import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  selectedProject: null,
  allProjects: [],
  loadingAllProjects: false
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload
    },
    setFetchAllProjects: (state, action) => {
      const { data, finish } = action.payload
      state.allProjects = data
      state.loadingAllProjects = finish
    },
    setStartFetchingAllProjects: (state, action) => {
      state.startFetchingAllProjects = action.payload
    },
    updateProjectList: (state, action) => {
      state.allProjects = action.payload
    }
  }
})

export const fetchAllProjectsList = createAsyncThunk(
  'admin/fetchImages',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(projectsSlice.actions.setStartFetchingAllProjects(true))
    return fetch(
      `${process.env.REACT_APP_CONFIG_URL}/v1/search/${process.env.REACT_APP_CONFIG_APP_ID}/projects`
    )
      .then((resp) => resp.json())
      .then((data) => {
        thunkAPI.dispatch(
          projectsSlice.actions.setFetchAllProjects({
            data: data.data[0].data.projects,
            finish: true
          })
        )
      })
      .catch((error) => {
        // handle error
        projectsSlice.actions.setFetchAllProjects({
          data: [],
          finish: true
        })
        console.log('error', error.message)
      })
  }
)

export const fetchLatestVersion = async (productName, year) => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_HMA_CDN_URL}&product__name=${productName}&year=${year}`
    )
    const data = await resp.json()

    const newLatestVersion = Math.max(
      ...data.results.map((res) => parseFloat(res.latest_version))
    )
    return newLatestVersion || '-'
  } catch (error) {
    console.log(error)
  }
}

const { actions, reducer } = projectsSlice
export const { setSelectedProject, updateProjectList, allProjects } = actions

export default reducer
