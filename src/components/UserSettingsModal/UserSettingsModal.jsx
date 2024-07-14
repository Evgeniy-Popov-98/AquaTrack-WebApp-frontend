import Modal from "../Modal/Modal.jsx"

const UserSettingsModal = ({ settingModalIsOpen, closeSettingModal }) => {
  return(
    <Modal modalIsOpen={settingModalIsOpen} closeModal={closeSettingModal}>
        <div>
            Setting
        </div>
    </Modal>
  )
}

export default UserSettingsModal