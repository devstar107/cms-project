export const multiplyScalar = 0.2 // old ver is 0.5

// you need check public folder
export const sprites = {
  arrow: '/png/sprites/arrows-with-transparent-red.png',
  circe: '/png/sprites/circe_normal_red.png',
  square: '/png/sprites/square_red.png',
  star: '/png/sprites/star.png',
  arrow_2: '/png/sprites/arrow-arc.png',
  circe_2: '/png/sprites/circle.png',
  square_2: '/png/sprites/square.png',
  arrow_3: '/png/sprites/arrows-with-transparent.png',
  circe_3: '/png/sprites/circe_normal.png',
  square_3: '/png/sprites/square_normal.png'
}

export const DEFAULT = 'DEFAULT'
// ui menu
export const menu = {
  CONTENT_MENUS: 'CONTENT_MENUS',
  GALLERY_MENUS: 'GALLERY_MENUS',
  DASHBOARD_MENUS: 'DASHBOARD_MENUS',
  // item
  ADD_MENU: 'ADD_MENU',
  SHOW_MENU: 'SHOW_MENU',
  HIDE_MENU: 'HIDE_MENU',
  ADD_SPRITE_NANO_MENU: 'ADD_SPRITE_NANO_MENU',
  VIEW_NANO_MENU: 'VIEW_NANO_MENU',
  // status
  MENU_DISABLE: 'MENU_DISABLE',
  MENU_ENABLE: 'MENU_ENABLE'
}

// ui slice
export const slice = {
  type: {
    STATIC_IMG: 'STATIC_IMG'
  },
  canvas: {
    draw: {
      ARROW_DRAW: 'ARROW_DRAW',
      CIRCE_DRAW: 'CIRCE_DRAW',
      SQUARE_DRAW: 'SQUARE_DRAW',
      // status
      SHOW_DRAW: 'SHOW_DRAW'
    }
  }
}

// ui configre
export const configre = {
  header: {
    status: {
      ADD_CONFIGRE: 'ADD_CONFIGRE'
    },
    active: {
      ARROW_CONFIGRE: 'ARROW_CONFIGRE',
      CIRCE_CONFIGRE: 'CIRCE_CONFIGRE',
      SQUARE_CONFIGRE: 'SQUARE_CONFIGRE'
    }
  },
  content: {
    ADD_MARKETS: 'ADD_MARKETS',
    ADD_SELECTED_MARKET: 'ADD_SELECTED_MARKET',
    SHOW_CMT: 'SHOW_CMT'
  }
}
