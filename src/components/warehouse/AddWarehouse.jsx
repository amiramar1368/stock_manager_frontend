import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState,useContext } from "react";

import ViewWarehouse from "./ViewWarehouse";
import useAxios from "../../customHook/useAxios";
import {loadingContext} from '../../App';

export default function AddWarehouse() {
  const httpService = useAxios();
  const [warehouses, setWarehouses] = useState([]);
  const {loading, setLoading}= useContext(loadingContext);

  const handleAddWarehouse = async (values) => {
    await httpService.post("/warehouses", values);
  };

  const handleSearchWarehouse = async () => {
    setLoading(true);
    const  data  = await httpService.get("/warehouses");
    setLoading(false);
    if (data.success) {
      setWarehouses(data.body);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          handleAddWarehouse(values);
        }}
      >
        <Form>
          <div className="row">
            <div className="my-2 col-sm-6">
              <label className="control-label">warehouse</label>
              <Field name="name" className="form-control" type="text" required />
            </div>
            <div className="my-2 col-sm-6">
              <label className="control-label"></label>
              <br />
              <button className="btn btn-primary mx-2" type="submit">
                Add
              </button>
              <button onClick={handleSearchWarehouse} className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <hr />
      <ViewWarehouse warehouses={warehouses} loading={loading} />
    </>
  );
}
