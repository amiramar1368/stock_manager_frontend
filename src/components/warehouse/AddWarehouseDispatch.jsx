import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState, createContext ,useContext} from "react";

import ViewDispatch from "./ViewDispatch";
import useAxios from "../../customHook/useAxios";
import {loadingContext} from '../../App';

function AddWarehouseAllocation() {
  const httpService = useAxios();
  const [goods, setGoods] = useState([]);
  const {loading, setLoading} = useContext(loadingContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getAllGoods() {
      const data = await httpService.get("/goods");
      if (data.success) {
        setGoods(data.body);
      }
    }
    getAllGoods();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const  data  = await httpService.get("/warehouse-dispatch");
    setLoading(false);
    if (data.success) {
      setRecords(data.body);
    }
  };

  const handleAddWArehouseDispatch = async (values, formikBag) => {
      const { data } = await httpService.post("/warehouse-dispatch", values);
      if (data.success) {
        formikBag.resetForm();
      }
  };

  return (
    <>
      <Formik
        initialValues={{
          recipient: "",
          goodId: 0,
          number: "",
          description: "",
        }}
        onSubmit={(values, formikBag) => {
          handleAddWArehouseDispatch(values, formikBag);
        }}
      >
        <Form>
          <div className="row">
            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">Recipient</label>
              <Field name="recipient" className="form-control" type="text" required />
              {/* <ErrorMessage name="recipient" render={(msg) => <div className="error-message">{msg}</div>} /> */}
            </div>

            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">Good</label>
              <Field name="goodId" as="select" className="form-select selectpicker" required>
                {/* <ErrorMessage name="goodId" render={(msg) => <div className="error-message">{msg}</div>} /> */}
                <option value={0} disabled></option>
                {goods.map((good, index) => {
                  return (
                    <option key={index} value={good.id}>
                      {good.name}
                    </option>
                  );
                })}
              </Field>
            </div>
            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">Number</label>
              <Field name="number" className="form-control" type="number" required />
              {/* <ErrorMessage name="number" render={(msg) => <div className="error-message">{msg}</div>} /> */}
            </div>
            <div className=" col-sm-12">
              <label className="control-label">Description</label>
              <Field as="textarea" rows={1} name="description" className="form-control" type="text"></Field>
              {/* <ErrorMessage name="description" render={(msg) => <div className="error-message">{msg}</div>} /> */}
            </div>

            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label"></label>
              <br />
              <button className="btn btn-primary mx-2" type="submit">
                Add
              </button>
              <button disabled={loading} onClick={handleSearch} className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <hr />
      <ViewDispatch records={records} loading={loading} />
    </>
  );
}

export default AddWarehouseAllocation;
