import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT, menu, configre, slice } from '../../constants/ui'

const {
  CONTENT_MENUS,
  GALLERY_MENUS,
  DASHBOARD_MENUS,
  ADD_MENU,
  SHOW_MENU,
  HIDE_MENU,
  ADD_SPRITE_NANO_MENU,
  VIEW_NANO_MENU,
  MENU_DISABLE,
  MENU_ENABLE
} = menu

const {
  header: {
    status: { ADD_CONFIGRE },
    active: {
      ARROW_CONFIGRE,
      CIRCE_CONFIGRE,
      SQUARE_CONFIGRE,
      CIRCE_CONFIGRE_NANO
    }
  },
  content: { ADD_MARKETS, ADD_SELECTED_MARKET, SHOW_CMT }
} = configre

const {
  type: { STATIC_IMG },
  canvas: {
    draw: { ARROW_DRAW, CIRCE_DRAW, SQUARE_DRAW, SHOW_DRAW }
  }
} = slice

const initialState = {
  presentation: {
    menu: {
      status: CONTENT_MENUS || GALLERY_MENUS || DASHBOARD_MENUS
      // disable: false,
    },
    slider: {
      type: STATIC_IMG,
      canvas: {
        status: false,
        draw: DEFAULT,
        data: {
          width: 0,
          arrows: [],
          circes: [],
          squares: []
        },
        rawDraw: {},
        index: null // or Id , (test)
      },

      controls: {
        disable: false
      }
    },
    configure: {
      header: {
        status: DEFAULT || ADD_CONFIGRE,
        active:
                    DEFAULT ||
                    ARROW_CONFIGRE ||
                    CIRCE_CONFIGRE ||
                    SQUARE_CONFIGRE
      },
      content: {
        status:
                    DEFAULT || ADD_MARKETS || ADD_SELECTED_MARKET || SHOW_CMT,
        descriptionFullText: false,
        comments: [],
        isComment: false,
        idSelectedComment: null
      },
      footer: DEFAULT || ADD_SELECTED_MARKET
    }
  }
}

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    // menu
    clickMenu: (state, action) => {
      state.presentation.configure.content.descriptionFullText = false
      state.presentation.slider.canvas.rawDraw = {}
      switch (action.payload) {
        case ADD_MENU:
          if (state.presentation.slider.type === STATIC_IMG) {
            state.presentation.slider.controls.disable = true
            state.presentation.slider.canvas.draw = SHOW_DRAW
            state.presentation.configure.header.active = DEFAULT
            state.presentation.configure.header.status =
                            ADD_CONFIGRE
            state.presentation.configure.content.status =
                            ADD_MARKETS
          }
          break
        case SHOW_MENU:
          if (state.presentation.slider.type === STATIC_IMG) {
            state.presentation.configure.header.active = DEFAULT
            state.presentation.configure.header.status = DEFAULT
            state.presentation.configure.content.status = SHOW_CMT
            state.presentation.configure.footer = DEFAULT
            state.presentation.slider.canvas.draw = SHOW_DRAW
            state.presentation.slider.controls.disable = false
          }
          break
        case HIDE_MENU:
          if (state.presentation.slider.type === STATIC_IMG) {
            state.presentation.slider.canvas.draw = DEFAULT
            state.presentation.configure.header.status = DEFAULT
            state.presentation.configure.content.status = DEFAULT
            state.presentation.slider.controls.disable = false
          } else {
            state.presentation.configure.header.status = DEFAULT
            state.presentation.configure.content.status = DEFAULT
          }
          break

        default:
          return state
          break
      }
    },
    // slicer

    customCanvasMatchCurrentScreen: (state, action) => {
      state.presentation.slider.canvas.data = action.payload
    },
    saveRawDraw: (state, action) => {
      state.presentation.slider.canvas.rawDraw = action.payload
    },

    changeIsComment: (state, action) => {
      state.presentation.configure.content.isComment = action.payload
    },

    // configre header
    closeAdd: (state) => {
      state.presentation.configure.header.active = DEFAULT
      state.presentation.configure.header.status = DEFAULT
      state.presentation.configure.content.status = DEFAULT
      state.presentation.configure.footer = DEFAULT
      state.presentation.configure.content.descriptionFullText = false
      if (state.presentation.slider.type === STATIC_IMG) {
        state.presentation.slider.canvas.draw = DEFAULT
        state.presentation.slider.canvas.rawDraw = {}
        state.presentation.slider.controls.disable = false
      }
    },
    // configre content
    selectedMarket: (state, action) => {
      // configre
      state.presentation.configure.header.active = action.payload
      state.presentation.configure.content.status = ADD_SELECTED_MARKET
      state.presentation.configure.footer = ADD_SELECTED_MARKET
      state.presentation.configure.content.isComment = false
      // slice
      switch (action.payload) {
        case ARROW_CONFIGRE:
          state.presentation.slider.canvas.draw = ARROW_DRAW
          break
        case CIRCE_CONFIGRE:
          state.presentation.slider.canvas.draw = CIRCE_DRAW
          break
        case SQUARE_CONFIGRE:
          state.presentation.slider.canvas.draw = SQUARE_DRAW
          break
        default:
          return state
          break
      }
      state.presentation.slider.canvas.status = true
    },
    setDescriptionFullText: (state) => {
      state.presentation.configure.content.descriptionFullText = true
    },
    changeUI: (state, action) => {
      state = action.payload
    },
    setIdSelectedComment: (state, action) => {
      state.presentation.configure.content.idSelectedComment =
                action.payload
    }
  }
})

const { actions, reducer } = canvasSlice
export const {
  changeUI,
  clickMenu,
  selectedMarket,
  closeAdd,
  setDescriptionFullText,
  customCanvasMatchCurrentScreen,
  saveRawDraw,
  changeIsComment,
  setIdSelectedComment
} = actions

export default reducer
