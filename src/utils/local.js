import { CIRCLE } from '../constants/constants'
import {
  DEFAULT,
  configre,
  slice,
  sprites,
  multiplyScalar
} from '../constants/ui'

const {
  header: {
    active: { ARROW_CONFIGRE, CIRCE_CONFIGRE, SQUARE_CONFIGRE }
  }
} = configre

const {
  canvas: {
    draw: { ARROW_DRAW, CIRCE_DRAW, SQUARE_DRAW, SHOW_DRAW }
  }
} = slice

export const mapContentSliceCamera = (item) => ({
  title: item.cameraName,
  description: item.description,
  comments: item.comments
})
export const mapContentSliceConfig = (item) => item.title

export const shortText = (text, numberChar) => {
  if (text?.length <= numberChar) {
    return {
      results: text,
      originText: text,
      status: false
    }
  }
  const results =
    text
      ?.split('')
      .map((char, index) => (index + 1 < numberChar ? char : ''))
      .join('') + '...'
  return {
    results,
    originText: text,
    status: true
  }
}

export const convertToDataCanvas = (commentsOfCamera) => {
  const arrows = []
  const circes = []
  const squares = []
  commentsOfCamera?.forEach((item) => {
    if (item.canvas?.type === 'ARROW') {
      arrows.push(item.canvas)
    } else if (item.canvas?.type === 'CIRCE') {
      circes.push(item.canvas)
    } else if (item.canvas?.type === 'SQUARE') {
      squares.push(item.canvas)
    }
  })
  return {
    arrows,
    circes,
    squares
  }
}

export const getNewDataCanvas = (dataCanvas, canvasCurrent) => {
  const newWidth = canvasCurrent.width
  const newArrows = dataCanvas?.arrows
    ? dataCanvas.arrows.map((item) => {
      const ratioX = canvasCurrent.width / item.width
      const ratioY = canvasCurrent.height / item.height
      return {
        width: item.width * ratioX,
        height: item.height * ratioY,
        fromX: item.fromX * ratioX,
        fromY: item.fromY * ratioY,
        toX: item.toX * ratioX,
        toY: item.toY * ratioY
      }
    })
    : []

  const newCirces = dataCanvas?.circes
    ? dataCanvas.circes.map((item) => {
      const ratioX = canvasCurrent.width / item.width
      const ratioY = canvasCurrent.height / item.height
      return {
        width: item.width * ratioX,
        height: item.height * ratioY,
        fromX: item.fromX * ratioX,
        fromY: item.fromY * ratioY,
        toX: item.toX * ratioX,
        toY: item.toY * ratioY
      }
    })
    : []

  const newSquares = dataCanvas?.squares
    ? dataCanvas.squares.map((item) => {
      const ratioX = canvasCurrent.width / item.width
      const ratioY = canvasCurrent.height / item.height
      return {
        width: item.width * ratioX,
        height: item.height * ratioY,
        fromX: item.fromX * ratioX,
        fromY: item.fromY * ratioY,
        toX: item.toX * ratioX,
        toY: item.toY * ratioY
      }
    })
    : []

  return {
    ...dataCanvas,
    width: newWidth,
    arrows: newArrows,
    circes: newCirces,
    squares: newSquares
  }
}

export const checkTwoDataCanvasWidthEquals = (canvas_1, canvas_2) => {
  return Math.ceil(canvas_1.width) === Math.ceil(canvas_2.width)
  return false
}

export const getNewXYCmtImgOfArrow = (
  fromX,
  fromY,
  toX,
  toY,
  imgWidth,
  imgHeight,
  cavansWidth,
  cavansHeight
) => {
  // arrow Top Left to Bot Right
  if (toX >= fromX && toY >= fromY) {
    // cmt at Top Left
    if (fromX < imgWidth && fromY < imgHeight) {
      return {
        fromX: 0,
        fromY: 0
      }
    }
    // cmt at Left
    else if (fromX < imgWidth) {
      return {
        fromX: 0,
        fromY: fromY - imgHeight / 2
      }
    }
    // cmt at Top
    else if (fromY < imgHeight) {
      return {
        fromX: fromX - imgWidth / 2,
        fromY: 0
      }
    }
    return {
      fromX: fromX - imgWidth / 2,
      fromY: fromY - imgHeight / 2
    }
  }
  // arrow Bottom Left to Top Right
  else if (toX >= fromX && toY <= fromY) {
    // cmt at Bot Left
    if (fromX < imgWidth && cavansHeight - fromY < imgHeight) {
      return {
        fromX: 0,
        fromY: cavansHeight - imgHeight
      }
    }
    // cmt at Left
    else if (fromX < imgWidth) {
      return {
        fromX: 0,
        fromY: fromY - imgHeight / 2
      }
    }
    // cmt at Bot
    else if (cavansHeight - fromY < imgHeight) {
      return {
        fromX: fromX - imgWidth / 2,
        fromY: cavansHeight - imgHeight
      }
    }

    return {
      fromX: fromX - imgWidth / 2,
      fromY: fromY - imgHeight / 2
    }
  }
  // arrow Top Right to Bot Left
  else if (toX <= fromX && toY >= fromY) {
    // cmt at top left
    if (cavansWidth - fromX < imgWidth && fromY < imgHeight) {
      return {
        fromX: cavansWidth - imgWidth,
        fromY: 0
      }
    }
    // cmt at left
    else if (cavansWidth - fromX < imgWidth) {
      return {
        fromX: cavansWidth - imgWidth,
        fromY: fromY - imgHeight / 2
      }
    }
    // cmt at top
    else if (fromY < imgHeight) {
      return {
        fromX: fromX - imgWidth / 2,
        fromY: 0
      }
    }
    return {
      fromX: fromX - imgWidth / 2,
      fromY: fromY - imgHeight / 2
    }
  }
  // arrow Bot Right to Top Left
  else if (toX <= fromX && toY <= fromY) {
    // cmt at bot left
    if (cavansWidth - fromX < imgWidth && cavansHeight - fromY < imgHeight) {
      return {
        fromX: cavansWidth - imgWidth,
        fromY: cavansHeight - imgHeight
      }
    }
    // cmt at left
    else if (cavansWidth - fromX < imgWidth) {
      return {
        fromX: cavansWidth - imgWidth,
        fromY: fromY - imgHeight / 2
      }
    }
    // cmt at bot
    else if (cavansHeight - fromY < imgHeight) {
      return {
        fromX: fromX - imgWidth / 2,
        fromY: cavansHeight - imgHeight
      }
    }
    return {
      fromX: fromX - imgWidth / 2,
      fromY: fromY - imgHeight / 2
    }
  }
  return {
    fromX,
    fromY
  }
}

export const getXYcirce = (fromX, fromY, toX, toY) => {
  const width = toX >= fromX ? toX - fromX : fromX - toX
  const height = toY >= fromY ? toY - fromY : fromY - toY
  const x = toX >= fromX ? fromX + width / 2 : fromX - width / 2
  const y = toY >= fromY ? toY - height / 2 : toY + height / 2
  const radius =
    Math.sqrt(
      Math.abs(width) * Math.abs(width) + Math.abs(height) * Math.abs(height)
    ) / 2
  return {
    x,
    y,
    radius
  }
}

export const getNewXYCmtImgOfCirce = (
  fromX,
  fromY,
  toX,
  toY,
  imgWidth,
  imgHeight,
  cavansWidth,
  cavansHeight
) => {
  const width = toX >= fromX ? toX - fromX : fromX - toX
  const height = toY >= fromY ? toY - fromY : fromY - toY
  const x = toX >= fromX ? fromX + width / 2 : fromX - width / 2
  const y = toY >= fromY ? toY - height / 2 : toY + height / 2
  const radius =
    Math.sqrt(
      Math.abs(width) * Math.abs(width) + Math.abs(height) * Math.abs(height)
    ) / 2
  return {
    fromX: x + radius, //* Math.cos(Math.PI / 4),
    fromY: y - radius / 2 //* Math.sin(Math.PI / 4)
  }
}

export const getXYcirceVer2 = (fromX, fromY, toX, toY) => {
  const width = toX >= fromX ? toX - fromX : fromX - toX
  const height = toY >= fromY ? toY - fromY : fromY - toY
  const x = fromX
  const y = fromY
  const radius = Math.sqrt(
    Math.abs(width) * Math.abs(width) + Math.abs(height) * Math.abs(height)
  )
  return {
    x,
    y,
    radius
  }
}

export const getNewXYCmtImgOfCirceVer2 = (
  fromX,
  fromY,
  toX,
  toY,
  imgWidth,
  imgHeight,
  cavansWidth,
  cavansHeight
) => {
  const width = toX >= fromX ? toX - fromX : fromX - toX
  const height = toY >= fromY ? toY - fromY : fromY - toY
  const x = fromX
  const y = fromY
  const radius = Math.sqrt(
    Math.abs(width) * Math.abs(width) + Math.abs(height) * Math.abs(height)
  )
  return {
    fromX: x + radius, //* Math.cos(Math.PI / 4),
    fromY: y - radius / 2 //* Math.sin(Math.PI / 4)
  }
}

export const getXYsquare = (fromX, fromY, toX, toY) => {
  const width = toX >= fromX ? toX - fromX : fromX - toX
  const height = toY >= fromY ? toY - fromY : fromY - toY
  const x = toX >= fromX ? fromX : toX
  const y = toY >= fromY ? fromY : toY
  return {
    x,
    y,
    width,
    height
  }
}

export const getNewXYCmtImgOfSquare = (
  fromX,
  fromY,
  toX,
  toY,
  imgWidth,
  imgHeight,
  cavansWidth,
  cavansHeight
) => {
  const width = toX >= fromX ? toX - fromX : fromX - toX
  const height = toY >= fromY ? toY - fromY : fromY - toY
  const x = toX >= fromX ? fromX + (toX - fromX) : toX + (fromX - toX)
  const y =
    toY >= fromY
      ? fromY + height / 2 - imgHeight / 2
      : toY + height / 2 - imgHeight / 2

  return {
    fromX: x,
    fromY: y
  }
}

export const typeDraw = (whatDraw) => {
  if (whatDraw === 'ARROW_DRAW') {
    return 'ARROW'
  }
  if (whatDraw === 'CIRCE_DRAW') {
    return 'CIRCE'
  }
  if (whatDraw === 'SQUARE_DRAW') {
    return 'SQUARE'
  }
  return 'DEFAULT'
}

export const getNewRawDrawCanvas = (rawDraw, canvasCurrent) => {
  const ratioX = canvasCurrent.width / rawDraw.width
  const ratioY = canvasCurrent.height / rawDraw.height
  return {
    ...rawDraw,
    width: rawDraw.width * ratioX,
    height: rawDraw.height * ratioY,
    fromX: rawDraw.fromX * ratioX,
    fromY: rawDraw.fromY * ratioY,
    toX: rawDraw.toX * ratioX,
    toY: rawDraw.toY * ratioY
  }
}

export const typeToSpriteUrl = (type) => {
  switch (type) {
    case 'ARROW':
      return sprites.arrow
      break
    case 'CIRCE':
      return sprites.circe
      break
    case 'SQUARE':
      return sprites.square
      break
    default:
      return null
      break
  }
}

export const typeSpriteByDataUrl = (dataURL) => {
  switch (dataURL) {
    case sprites.arrow:
      return 'ARROW'
      break
    case sprites.circe:
      return 'CIRCE'
      break
    case sprites.square:
      return 'SQUARE'
      break
    default:
      return null
      break
  }
}

export const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  return false
}

export const showAnnotationIcon = (toolName) => {
  return toolName === CIRCLE ? '' : ''
}

export const commentTypes = [
  { label: 'General Comment', value: 'general_comment' },
  { label: 'Trim Comment', value: 'trim_comment' },
  { label: 'Color Comment', value: 'color_comment' },
  { label: 'Camera Comment', value: 'camera_comment' },
  { label: 'Config Comment', value: 'config_comment' }
]
