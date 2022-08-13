import React from 'react'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import CancelIcon from '@material-ui/icons/Cancel'
import './Modal.scss'

const ModalDisplay = ({ modalBody, openModal, closeModal }) => {
  const handleClose = () => {
    closeModal(false)
  }

  return (
    <Modal
      className='modal-wrapper'
      open={openModal}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={openModal}>
        <div className='modal-wrapper_modal-body'>
          <div className='close-icon' onClick={closeModal}>
            <CancelIcon />
          </div>

          <div className='body-content'>{modalBody}</div>
        </div>
      </Fade>
    </Modal>
  )
}
export default ModalDisplay
