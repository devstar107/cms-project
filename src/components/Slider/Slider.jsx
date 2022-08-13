import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  customCanvasMatchCurrentScreen,
  saveRawDraw,
  changeIsComment,
  clickMenu
} from '../../features/canvas/canvasSlice'
import './Slider.scss'
import { TextareaAutosize, Chip } from '@material-ui/core'
import {
  convertToDataCanvas,
  getNewDataCanvas,
  checkTwoDataCanvasWidthEquals,
  getNewXYCmtImgOfArrow,
  getXYcirce,
  getNewXYCmtImgOfCirce,
  getXYsquare,
  getNewXYCmtImgOfSquare,
  typeDraw,
  getNewRawDrawCanvas,
  commentTypes
} from '../../utils/local'
import cmt from '../../assets/png/cmt.png'
import useWindowSize from '../../hooks/useWindowSize'
import { DEFAULT, slice } from '../../constants/ui'
import ModalDisplay from '../common/Modal/Modal'
import Button from '../common/Button/Button'
import MyCheckBox from '../common/CheckBox/CheckBox'
import { saveProjectComments, setSaveComments } from '../../features/ui/uiSlice'
import { nanoid } from 'nanoid'

const {
  canvas: {
    draw: { ARROW_DRAW, CIRCE_DRAW, SQUARE_DRAW, SHOW_DRAW }
  }
} = slice

const Slider = ({ imageSource }) => {
  const dispatch = useDispatch()
  const canvasSlider = useSelector((state) => state.canvas.presentation.slider)
  const indexDrawOnSlice = useSelector(
    (state) => state.canvas.presentation.slider.canvas.index
  )
  const rawDrawOnSlide = useSelector(
    (state) => state.canvas.presentation.slider.canvas.rawDraw
  )
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const imgRef = useRef(null)
  const cmtImgRef = useRef(null)
  const [openCommentOptionsModal, setOpenCommentOptionsModal] = useState(false)
  const [openCommentTextModal, setOpenCommentTextModal] = useState(false)
  const [commentCheckedValues, setCommentCheckedValues] = useState()
  const [addNewComment, setAddNewComment] = useState('')

  const [start, setStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [widthScreen, heightScreen] = useWindowSize()

  const dataCanvas = canvasSlider.canvas.data
  const {
    configre: {
      cameraControls,
      selectedTrimValue,
      selectedExterior,
      selectedInterior,
      showComments
    },
    saveComments
  } = useSelector((state) => state.ui)

  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  )

  const onLoadCanvas = async (status) => {
    const img = document.getElementById('sourceImg')
    const cmt2 = document.getElementById('icon')
    const canvas = document.getElementById('myCanvas')
    const ctx = canvas.getContext('2d')
    imgRef.current = img
    canvasRef.current = canvas
    cmtImgRef.current = cmt2
    contextRef.current = ctx
    if (status === 'FIRST') {
      img.addEventListener(
        'load',
        () => {
          const newDataCanvas = getNewDataCanvas(dataCanvas, {
            width: imgRef.current.offsetWidth,
            height: imgRef.current.offsetHeight
          })
          if (!checkTwoDataCanvasWidthEquals(dataCanvas, newDataCanvas)) {
            // match current screen
            dispatch(customCanvasMatchCurrentScreen(newDataCanvas))
            return
          }
          createCanvas(imgRef.current, contextRef.current, canvasRef.current)
        },
        false
      )
    } else {
      const newDataCanvas = getNewDataCanvas(dataCanvas, {
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight
      })
      if (!checkTwoDataCanvasWidthEquals(dataCanvas, newDataCanvas)) {
        // match current screen
        dispatch(customCanvasMatchCurrentScreen(newDataCanvas))
        return
      }
      createCanvas(img, ctx, canvas)
    }
  }

  const createCanvas = (img, ctx, canvas) => {
    const dWidth = img.offsetWidth
    const dHeight = img.offsetHeight
    // console.log('image data', img.width, img.height, dWidth, dHeight);

    // console.log('canvas.width', canvas.width);
    const ratio = img.naturalWidth / img.naturalHeight
    const Rwidth = canvas.width
    const Rheight = Rwidth / ratio
    canvas.width = dWidth // dWidth;
    canvas.height = Rheight // dHeight;
    setStart({ ...start, width: dWidth, height: Rheight })

    ctx.drawImage(img, 0, 0, dWidth, Rheight)

    if (canvasSlider.canvas.draw !== DEFAULT) {
      drawRawCanvas(
        getNewRawDrawCanvas(canvasSlider.canvas.rawDraw, {
          width: img.offsetWidth,
          height: img.offsetHeight
        })
      )
      drawCanvas(dataCanvas)
    }
  }

  const drawImageFull = (ctx, img, canvas) => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }

  const drawCanvas = (data) => {
    data?.arrows?.forEach((arrow) => {
      canvas_arrow(arrow.fromX, arrow.fromY, arrow.toX, arrow.toY)
    })
    data?.circes?.forEach((arrow) => {
      canvas_circe(arrow.fromX, arrow.fromY, arrow.toX, arrow.toY)
    })
    data?.squares?.forEach((arrow) => {
      canvas_square(arrow.fromX, arrow.fromY, arrow.toX, arrow.toY)
    })
  }

  const drawRawCanvas = (rawDraw) => {
    const whatDraw = rawDraw.type + '_DRAW'
    if (whatDraw === ARROW_DRAW) {
      canvas_arrow(rawDraw.fromX, rawDraw.fromY, rawDraw.toX, rawDraw.toY)
    }
    if (whatDraw === CIRCE_DRAW) {
      console.log(
        'arrow.fromX, arrow.fromY',
        rawDraw.fromX,
        rawDraw.fromY,
        rawDraw.toX,
        rawDraw.toY
      )
      canvas_circe(rawDraw.fromX, rawDraw.fromY, rawDraw.toX, rawDraw.toY)
    }
    if (whatDraw === SQUARE_DRAW) {
      canvas_square(rawDraw.fromX, rawDraw.fromY, rawDraw.toX, rawDraw.toY)
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    setStart({ ...start, x: offsetX, y: offsetY })
    setIsDrawing(true)
    dispatch(changeIsComment(false))
  }

  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    const whatDraw = canvasSlider.canvas.draw
    if (isDrawing) {
      dispatch(
        saveRawDraw({
          width: start.width,
          height: start.height,
          fromX: start.x,
          fromY: start.y,
          toX: offsetX,
          toY: offsetY,
          type: typeDraw(whatDraw)
        })
      )
      dispatch(changeIsComment(true))
      setOpenCommentOptionsModal(true)
    }
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    const whatDraw = canvasSlider.canvas.draw
    if (isDrawing) {
      const { offsetX, offsetY } = nativeEvent
      canvas_clear()
      drawImageFull(contextRef.current, imgRef.current, canvasRef.current)
      drawCanvas(dataCanvas)
      if (whatDraw === ARROW_DRAW) {
        canvas_arrow(start.x, start.y, offsetX, offsetY)
      }
      if (whatDraw === CIRCE_DRAW) {
        canvas_circe(start.x, start.y, offsetX, offsetY)
      }
      if (whatDraw === SQUARE_DRAW) {
        canvas_square(start.x, start.y, offsetX, offsetY)
      }
    }
  }

  const canvas_clear = () => {
    const ctx = contextRef.current
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const canvas_arrow = (fromX, fromY, toX, toY) => {
    const headlen = 10 // length of head in pixels
    const dx = toX - fromX
    const dy = toY - fromY
    const angle = Math.atan2(dy, dx)
    const ctx = contextRef.current
    ctx.strokeStyle = 'red' || 'black'
    // ctx.lineCap = "round";
    ctx.lineWidth = 3
    const newXYcmtImg = getNewXYCmtImgOfArrow(
      fromX,
      fromY,
      toX,
      toY,
      cmtImgRef.current.width,
      cmtImgRef.current.height,
      canvasRef.current.width,
      canvasRef.current.height
    )

    ctx.drawImage(
      cmtImgRef.current,
      newXYcmtImg.fromX,
      newXYcmtImg.fromY,
      cmtImgRef.current.width,
      cmtImgRef.current.height
    )

    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.lineTo(
      toX - headlen * Math.cos(angle - Math.PI / 6),
      toY - headlen * Math.sin(angle - Math.PI / 6)
    )
    ctx.moveTo(toX, toY)
    ctx.lineTo(
      toX - headlen * Math.cos(angle + Math.PI / 6),
      toY - headlen * Math.sin(angle + Math.PI / 6)
    )
    ctx.stroke()
  }

  const canvas_circe = (fromX, fromY, toX, toY) => {
    const ctx = contextRef.current
    ctx.strokeStyle = 'red' || 'black'
    ctx.lineWidth = 2
    const newXYcmtImg = getNewXYCmtImgOfCirce(
      fromX,
      fromY,
      toX,
      toY,
      cmtImgRef.current.width,
      cmtImgRef.current.height,
      canvasRef.current.width,
      canvasRef.current.height
    )
    ctx.drawImage(
      cmtImgRef.current,
      newXYcmtImg.fromX,
      newXYcmtImg.fromY,
      cmtImgRef.current.width,
      cmtImgRef.current.height
    )
    const circe = getXYcirce(fromX, fromY, toX, toY)
    ctx.beginPath()
    ctx.arc(circe.x, circe.y, circe.radius, 0, 2 * Math.PI)
    // const square = getXYsquare(fromX, fromY, toX, toY);
    // ctx.rect(square.x, square.y, square.width, square.height);
    ctx.stroke()
  }

  const canvas_square = (fromX, fromY, toX, toY) => {
    const ctx = contextRef.current
    ctx.strokeStyle = 'red' || 'black'
    ctx.lineWidth = 2
    const newXYcmtImg = getNewXYCmtImgOfSquare(
      fromX,
      fromY,
      toX,
      toY,
      cmtImgRef.current.width,
      cmtImgRef.current.height,
      canvasRef.current.width,
      canvasRef.current.height
    )
    ctx.drawImage(
      cmtImgRef.current,
      newXYcmtImg.fromX,
      newXYcmtImg.fromY,
      cmtImgRef.current.width,
      cmtImgRef.current.height
    )
    const square = getXYsquare(fromX, fromY, toX, toY)
    ctx.beginPath()
    ctx.rect(square.x, square.y, square.width, square.height)
    ctx.stroke()
  }

  useEffect(() => {
    onLoadCanvas('FIRST')
  }, [canvasSlider])

  useEffect(() => {
    onLoadCanvas()
  }, [
    canvasSlider.canvas.draw,
    canvasSlider.canvas.data,
    canvasSlider.canvas.rawDraw
  ])

  const selectedCameraControl =
    cameraControls &&
    Array.isArray(cameraControls.data) &&
    cameraControls.data.find(({ value }) => value === cameraControls.value)

  useEffect(() => {
    const { version, id: projectID } = selectedProject || {
      version: '',
      id: ''
    }

    const filterComments =
      saveComments &&
      saveComments.filter(
        ({
          versionId,
          projectId,
          fscId,
          interiorId,
          cameraControlId,
          exteriorColorId
        }) => {
          // console.log("fscId", selectedTrimValue.value, fscId);
          // console.log("projectId --- ", projectID, projectId);
          // console.log("versionId --- ", versionId);
          // console.log(
          //     "cameraControlId --- ",
          //     cameraControlId,
          //     selectedCameraControl.value
          // );
          // console.log(
          //     "exteriorColorId --- ",
          //     exteriorColorId,
          //     selectedExterior
          // );
          // console.log(
          //     "interiorId --- ",
          //     interiorId,
          //     selectedInterior
          // );
          return (
            selectedTrimValue.value === fscId &&
            projectId === projectID &&
            versionId === version &&
            cameraControlId === selectedCameraControl.value &&
            exteriorColorId === selectedExterior.value &&
            interiorId === selectedInterior.value
          )
        }
      )
    dispatch(
      customCanvasMatchCurrentScreen(convertToDataCanvas(filterComments))
    )
  }, [
    saveComments,
    widthScreen,
    selectedInterior.value,
    selectedExterior.value,
    selectedCameraControl.value,
    selectedProject,
    selectedTrimValue.value,
    showComments
  ])

  const onSelectedCommentOption = () => {
    setOpenCommentOptionsModal(false)
    setOpenCommentTextModal(true)
  }

  const closeCommentText = () => {
    setCommentCheckedValues()
    setOpenCommentTextModal(false)
  }

  const onChangeComment = (e) => {
    const currentText = e.target.value
    setAddNewComment(currentText)
  }
  const onCommentComplete = () => {
    const { version, id: projectID } = selectedProject || {
      version: '',
      id: ''
    }
    selectedProject &&
      selectedProject.id &&
      selectedProject.version &&
      dispatch(
        setSaveComments({
          id: nanoid(5),
          exteriorColorId: selectedExterior.value,
          cameraControlId: selectedCameraControl.value,
          interiorId: selectedInterior.value,
          fscId: selectedTrimValue.value,
          canvas: rawDrawOnSlide,
          projectId: projectID,
          versionId: version,
          commentDetail: {
            user: 'User Name',
            createdDate: '5/7/2022',
            content: {
              selectedTrim: selectedTrimValue.name,
              selectedCameraControl: selectedCameraControl.title,
              message: addNewComment
            }
          },
          index: indexDrawOnSlice,
          message: addNewComment
        })
      )
    dispatch(saveProjectComments({ projectID, newComment: {
      id: nanoid(5),
      exteriorColorId: selectedExterior.value,
      cameraControlId: selectedCameraControl.value,
      interiorId: selectedInterior.value,
      fscId: selectedTrimValue.value,
      canvas: rawDrawOnSlide,
      projectId: projectID,
      versionId: version,
      commentDetail: {
        user: 'User Name',
        createdDate: '5/7/2022',
        content: {
          selectedTrim: selectedTrimValue.name,
          selectedCameraControl: selectedCameraControl.title,
          message: addNewComment
        }
      },
      index: indexDrawOnSlice,
      message: addNewComment
    } }));
    setOpenCommentTextModal(false)
    dispatch(clickMenu('SHOW_MENU'))
  }

  const onCommentModalClose = () => {
    setOpenCommentOptionsModal(false)
  }

  return (
    <div className='slider'>
      <div className='slider_comment-icon'>
        <img id='icon' src={cmt} alt='comment-icon' />
      </div>
      <div className='slider_photos'>
        <img
          id='sourceImg'
          src={imageSource}
          alt=''
          className='slider_photo slider_photo-hide'
        />

        <canvas
          id='myCanvas'
          // width={1000}
          // height={505}
          className={`slider_photo  ${
            canvasSlider.canvas.draw !== DEFAULT &&
            canvasSlider.canvas.draw !== SHOW_DRAW &&
            'slider_photo-drawing'
          }`}
          onMouseDown={
            canvasSlider.canvas.draw !== DEFAULT &&
            canvasSlider.canvas.draw !== SHOW_DRAW
              ? startDrawing
              : () => {}
          }
          onMouseUp={
            canvasSlider.canvas.draw !== DEFAULT &&
            canvasSlider.canvas.draw !== SHOW_DRAW
              ? finishDrawing
              : () => {}
          }
          onMouseMove={
            canvasSlider.canvas.draw !== DEFAULT &&
            canvasSlider.canvas.draw !== SHOW_DRAW
              ? draw
              : () => {}
          }
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      <ModalDisplay
        modalBody={
          <div className='slider_comment'>
            <div className='slider_comment_heading'>COMMENT TYPE</div>

            <div className='slider_comment_comment-list'>
              <MyCheckBox
                checkBoxList={commentTypes}
                checkedValues={setCommentCheckedValues}
              />
            </div>

            <div className='next-wrapper'>
              <Button
                className='next-button'
                onClick={onSelectedCommentOption}
                toolTipText='Please select atleast one.'
                toolTipOpen={
                  !(commentCheckedValues && commentCheckedValues.length > 0)
                }
                toolTipArrow
                disabled={
                  !(commentCheckedValues && commentCheckedValues.length > 0)
                }
              >
                Next
              </Button>
            </div>
          </div>
        }
        openModal={openCommentOptionsModal}
        closeModal={onCommentModalClose}
      />
      <ModalDisplay
        modalBody={
          <div className='slider_comment'>
            <div className='slider_comment_heading'>Add Note</div>

            <div className='slider_comment_comment-text'>
              <div className='chip'>
                Config:
                <Chip
                  size='small'
                  label={selectedTrimValue.name}
                  color='primary'
                  variant='outlined'
                />
                <Chip
                  size='small'
                  color='primary'
                  label={selectedCameraControl.title}
                  variant='outlined'
                />
              </div>
              Note:
              <TextareaAutosize
                aria-label='comment'
                minRows={6}
                placeholder=''
                onChange={onChangeComment}
                style={{ width: '100%' }}
                autoFocus
              />
            </div>

            <div className='next-wrapper'>
              <Button
                className='next-button'
                onClick={onCommentComplete}
                toolTipText='Please write few comments.'
                toolTipOpen={
                  !(commentCheckedValues && commentCheckedValues.length > 0)
                }
                toolTipArrow
                disabled={
                  !(commentCheckedValues && commentCheckedValues.length > 0)
                }
              >
                COMPLETE
              </Button>
            </div>
          </div>
        }
        openModal={openCommentTextModal}
        closeModal={closeCommentText}
      />
    </div>
  )
}

export default Slider
