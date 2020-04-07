import React from 'react';
import './ModalForm.css'

const ModalForm = ({ handleClose, show, children }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button className="closebtn" onClick={handleClose}>close</button>
                <div className="modal-body">
    <form>
        <label>
            Title:
            <input type="text" name="name" />
        </label>
        <label><br />
            Body:
             <input type="text" name="name" />
        </label><br />
        <input className="submit" type="submit" value="Submit" /><br />
        <button className="update">Update</button>
    </form>
</div>
            </section>

        </div>
    );
};
export default ModalForm;

