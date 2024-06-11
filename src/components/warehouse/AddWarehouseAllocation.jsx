import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState, useContext } from "react";

import ViewAllocation from "./ViewAllocation";
import useAxios from "../../customHook/useAxios";
import {loadingContext} from '../../App';


function AddWarehouseAllocation() {
  const httpService = useAxios();
  const [goods, setGoods] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const {loading, setLoading} = useContext(loadingContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getInitialValues() {
      const goods = await httpService.get("/goods");
      const Warehouses = await httpService.get("/Warehouses");
      if (goods.success && Warehouses.success) {
        setGoods(goods.body);
        setWarehouses(Warehouses.body);
      }
    }
    getInitialValues();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const data = await httpService.get("/warehouse-Allocation");
    setLoading(false);
    if (data.success) {
      setRecords(data.body);
    }
  };

  const handleAddWArehouseAllocation = async (values, formikBag) => {
      await httpService.post("/warehouse-Allocation", values);  
  };

  return (
    <>
      <Formik
        initialValues={{
          goodId: 0,
          number: "",
          warehouseId: 0,
          description: "",
        }}
        onSubmit={(values, formikBag) => {
          handleAddWArehouseAllocation(values, formikBag);
        }}
      >
        <Form>
          <div className="row">
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

            <div className="my-2 col-sm-6 col-md-4 col-xl-3">
              <label className="control-label">Warehouse</label>
              <Field name="warehouseId" as="select" className="form-select selectpicker" required>
                {/* <ErrorMessage name="warehouseId" render={(msg) => <div className="error-message">{msg}</div>} /> */}
                <option value={0} disabled></option>
                {warehouses.map((warehouse, index) => {
                  return (
                    <option key={index} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  );
                })}
              </Field>
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
      <ViewAllocation records={records} loading={loading} />
    </>
  );
}

export default AddWarehouseAllocation;
