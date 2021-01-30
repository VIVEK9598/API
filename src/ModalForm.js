import React from 'react';
import './ModalForm.css';

const ModalForm = ({
  handleClose,
  show,
  children,
  editMoal,
  addModal,
  handleSubmit,
  disabled
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <button className='closebtn' onClick={handleClose}>
          close
        </button>
        <div className='modal-body'>
          <form id='form' onSubmit={handleSubmit}>
           {children}
            <br />
            {addModal ? (
              <input disabled={disabled} className='submit' type='submit' value='Submit' />
            ) : (
              ''
            )}
            <br />
            {editMoal ? (
              <input disabled={disabled} className='update' type='submit' value='Update'></input>
            ) : (
              ''
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
export default ModalForm;
