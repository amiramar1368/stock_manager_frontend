import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState, createContext,useContext } from "react";
import { toast } from "react-toastify";

import { userValidator } from "../../validation/userValidation";
import useAxios from "../../customHook/useAxios";
import ViewUser from "./ViewUser";
import {loadingContext} from '../../App';

export const userContext = createContext();

export default function AddUser() {
  const {loading,setLoading} = useContext(loadingContext)
  const httpServise = useAxios();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRoles() {
      const data = await httpServise.get("/roles");
      setRoles(data.body);
    }
    getRoles();
  }, []);

  const handleSearchUser = async () => {
    setLoading(true)
    const data = await httpServise.get("/users");
    setLoading(false)
    setUsers(data.body);
  };

  const handleRemoveUser = async (userId) => {
    const data = await httpServise.delete(`/users/${userId}`);
    if(data.success){
      const filterdUser = users.filter((user) => user.id !== userId);
    setUsers(filterdUser);
    }
  };

  const handleAddUser = async (values, formikBag) => {
   await httpServise.post("/users", values);
  };

  const handleEditUser = async (user) => {
    try {
      const response = await httpServise.put(`/users/${user.id}`, user);

      if (response.success) {
        const role = roles.find((item) => item.id == user.roleId);
        const oldUser = users.find((item) => item.id === user.id);
        const newUser = { ...user, role: { ...role } };
        const oldUserIndex = users.indexOf(oldUser);

        //make a deep copy from users
        const updatedUsers = JSON.parse(JSON.stringify(users));

        //replace newUser
        updatedUsers[oldUserIndex] = newUser;
        setUsers(updatedUsers);

        toast.success("user edit successfully");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <userContext.Provider value={{ roles, handleEditUser }}>
      <Formik
        initialValues={{
          fullname: "",
          username: "",
          roleId: 0,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={userValidator}
        onSubmit={(values, formikBag) => {
          handleAddUser(values, formikBag);
        }}
      >
        <Form>
          <div className="row">
            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">fullname</label>
              <Field name="fullname" className="form-control" type="text" required />
              <ErrorMessage name="fullname" render={(msg) => <div className="error-message">{msg}</div>} />
            </div>

            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">role</label>
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

            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">username</label>
              <Field name="username" className="form-control" type="text" required />
              <ErrorMessage name="username" render={(msg) => <div className="error-message">{msg}</div>} />
            </div>
            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">password</label>
              <Field name="password" className="form-control" type="password" required />
              <ErrorMessage name="password" render={(msg) => <div className="error-message">{msg}</div>} />
            </div>
            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">repeat password</label>
              <Field name="confirmPassword" className="form-control" type="password" required />
              <ErrorMessage name="confirmPassword" render={(msg) => <div className="error-message">{msg}</div>} />
            </div>

            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label"></label>
              <br />
              <button className="btn btn-primary mx-2" type="submit">
                Add
              </button>
              <button disabled={loading} onClick={handleSearchUser} className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <hr />
      <ViewUser users={users} loading={loading} handleRemoveUser={handleRemoveUser} />
    </userContext.Provider>
  );
}
