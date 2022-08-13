import React from 'react'
import {
  init,
  animate,
  update,
  dispose,
  setTexture,
  setCamera
} from './panoHelper'
import './PanoView.scss'

class PanoView extends React.Component {
  constructor (props) {
    super(props)
    this.canvasContainerRef = React.createRef()
    this.image = props.src
  }

  componentDidMount () {
    this.instance = init(
      this.canvasContainerRef.current,
      this.image,
      null,
      null,
      null,
      null
    )
    animate()
  }

  onConfig (src) {
    this.image = src
    setTexture(this.image)
    setCamera()
    update()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.src !== nextProps.src) {
      this.onConfig(nextProps.src)
    }
  }

  render () {
    return (
      <div className='pano_wrapper'>
        <div ref={this.canvasContainerRef} class='pano_wrapper_canvas' />
      </div>
    )
  }
}

export default PanoView
