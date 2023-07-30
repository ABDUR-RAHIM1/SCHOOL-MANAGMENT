import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from "../../Components/Spinner/Spinner"
import FormInput from '../../Utilities/FormInput';
import { GlobalContext } from '../../State/State';

function ResetPassword(props) {     //  from admin login component
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false)
    props.show(false)
  };
  const [isLoading, setIsloding] = useState(false)
  const [message, setMessage] = useState("")
  const { loginInfo, setLoginInfo } = useContext(GlobalContext);

  const handleResetChange = (e) => {
    const value = (e.target.value).toLowerCase();
    setLoginInfo({ ...loginInfo, [e.target.name]: value });
  };

  const handleRsetSubmit = (e) => {
    setIsloding(true)
    e.preventDefault();
    fetch(`http://localhost:8000/api/admin/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    }).then(res => res.json())
      .then(data => {
        setIsloding(false)
        data.error ? setMessage(data.error) : setMessage(data.message)
      })
  };


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRsetSubmit}>
            <FormInput
              type="text"
              placeholder="Username"
              name="name"
              value={loginInfo.name}
              required="required"
              handleChange={handleResetChange}
            />
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              value={loginInfo.email}
              required="required"
              handleChange={handleResetChange}
            />
            <FormInput
              type="password"
              placeholder="New password"
              name="password"
              required="required"
              value={loginInfo.password}
              handleChange={handleResetChange}
            />
            <button className='button-63 my-3'>Reset Now</button>
          </form>
          {
            isLoading ? <Spinner /> : (
              message.includes("valid") ? <h6 className='text-center text-danger my-3'>{message}</h6> :
                <h6 className='text-center text-success my-3'>{message}</h6>
            )
          }

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPassword;
