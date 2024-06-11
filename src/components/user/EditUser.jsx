import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Formik, ErrorMessage, Field } from "formik";


import { editUserValidator } from "../../validation/userValidation";
import { userContext } from "./AddUser";

function EditUser({ title, user }) {
  const { roles, handleEditUser } = useContext(userContext);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <i onClick={handleShow} className="bi bi-pencil-square bi-button"></i>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              id:user.id,
              fullname: user.fullname,
              username: user.username,
              roleId: user.role.id,
              password: "",
            }}
            validationSchema={editUserValidator}
            onSubmit={(values) => {
              handleEditUser(values);
            }}
          >
            <Form>
              <div className="row">
                <div className="my-2 col-sm-6 col-md-4">
                  <label className="control-label">Fullname</label>
                  <Field name="fullname" className="form-control" type="text" required />
                  <ErrorMessage name="fullname" render={(msg) => <div className="error-message">{msg}</div>} />
                </div>

                <div className="my-2 col-sm-6 col-md-4">
                  <label className="control-label">Role</label>
                  <Field name="roleId" as="select" className="form-select selectpicker" required>
                    <ErrorMessage name="roleId" render={(msg) => <div className="error-message">{msg}</div>} />
                    <option value={0} disabled></option>
                    {roles.map((role, index) => {
                      return (
                        <option key={index} value={role.id}>
                          {role.name}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                <div className="my-2 col-sm-6 col-md-4">
                  <label className="control-label">Username</label>
                  <Field name="username" className="form-control" type="text" required />
                  <ErrorMessage name="username" render={(msg) => <div className="error-message">{msg}</div>} />
                </div>
                <div className="my-2 col-sm-6 col-md-4 ">
                  <label className="control-label">Password</label>
                  <Field name="password" className="form-control" type="password" required />
                  <ErrorMessage name="password" render={(msg) => <div className="error-message">{msg}</div>} />
                </div>
              </div>
              <div className="mt-2">
                <Button className="mx-2" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Edit
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUser;
