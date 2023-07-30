import { useState } from 'react'; 
import Modal from 'react-bootstrap/Modal';

function Notification({message}) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false); 

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
           <h6 className={message.includes("successfull") ? "text-success" : "text-danger"}>{message}</h6>
        </Modal.Header> 
      </Modal>
    </>
  );
}

export default Notification;