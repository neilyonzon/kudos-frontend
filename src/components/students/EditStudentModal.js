import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  //Modal.setAppElement('#yourAppElement')

const EditStudentModal = props => {
    return(
        <Modal
            isOpen={props.editStudent}
            onRequestClose={props.onCloseEditStudent}
            style={customStyles}
        >
            <h2>This is the edit student modal</h2>

        </Modal>
    )
}

export default EditStudentModal;