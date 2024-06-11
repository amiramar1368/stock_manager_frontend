import { useState ,useContext} from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import ViewGoodType from "./ViewGoodType";
import useAxios from "../../customHook/useAxios";
import {loadingContext} from '../../App';

export default function AddGoodType() {
  const httpService = useAxios();
  const [goodTypes, setGoodTypes] = useState([]);
  const {loading, setLoading} = useContext(loadingContext);

  const handleAddGoodType = async (values) => {
    await httpService.post("/good-types", values);
  };

  const handleSearchGoodType = async () => {
      setLoading(true);
      const data  = await httpService.get("/good-types");
      setLoading(false);
      if (data.success) {
        setGoodTypes(data.body);
      }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(values) => {
          handleAddGoodType(values);
        }}
      >
        <Form>
          <div className="row">
            <div className="my-2 col-sm-6">
              <label className="control-label">good type</label>
              <Field name="name" className="form-control" type="text" required />
              <ErrorMessage name="name" render={() => <div className="error-message">good type is required</div>} />
            </div>
            <div className="my-2 col-sm-6">
              <label className="control-label"></label>
              <br />
              <button className="btn btn-primary mx-2" type="submit">
                Add
              </button>
              <button onClick={handleSearchGoodType} className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <hr />
      <ViewGoodType goodTypes={goodTypes} loading={loading} />
    </>
  );
}
