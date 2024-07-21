import Modal from '../Modal/Modal.jsx';

import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';

import css from './UserSettingsModal.module.css';

const UserSettingsModal = ({ settingModalIsOpen, closeSettingModal }) => {
  return (
    <Modal modalIsOpen={settingModalIsOpen} closeModal={closeSettingModal}>
      <div className={css.box}>
        <h3 className={css.title}>Setting</h3>
        <UserSettingsForm closeSettingModal={closeSettingModal} />
      </div>
    </Modal>
  );
};

export default UserSettingsModal;
