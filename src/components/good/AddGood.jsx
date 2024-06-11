import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState, useEffect,useContext } from "react";
import { toast } from "react-toastify";

import ViewGood from "./ViewGood";
import useAxios from "../../customHook/useAxios";
import {loadingContext} from '../../App';

export default function AddGood() {
  const httpService = useAxios();
  const [goodTypes, setGoodTypes] = useState([]);
  const [goods, setGoods] = useState([]);
  const {loading, setLoading} = useContext(loadingContext);

  useEffect(() => {
    async function fetchGoodTypes() {
      const data = await httpService.get("/good-types");
      if (data.success) {
        setGoodTypes(data.body);
      } else {
        toast.error(data.message);
      }
    }
    fetchGoodTypes();
  }, []);

  const handleAddGood = async (values) => {
    const { data } = await httpService.post("/goods", values);
  };

  const handleSearchGood = async () => {
    setLoading(true);
    const data = await httpService.get("/goods");
    setLoading(false);
    if (data.success) {
      setGoods(data.body);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          goodTypeId: 0,
          name: "",
        }}
        onSubmit={(values) => {
          handleAddGood(values);
        }}
      >
        <Form>
          <div className="row">
            <div className="my-2 col-sm-6 col-md-4">
              <label className="control-label">good type</label>
              <Field as="select" name="goodTypeId" className="form-select selectpicker">
                <option value={0} disabled></option>
                {goodTypes.length > 0 &&
                  goodTypes.map((goodType) => {
                    return (
                      <option key={goodType.id} value={goodType.id}>
                        {goodType.name}
                      </option>
                    );
                  })}
              </Field>
            </div>
            <div className="my-2 col-sm-6 col-md-4">
              <label htmlFor="" className="control-label">
                good
              </label>
              <Field name="name" className="form-control" type="text" required />
            </div>
            <div className="my-2 col-sm-6 col-md-4">
              <label className="control-label"></label>
              <br />
              <button className="btn btn-primary mx-2" type="submit">
                Add
              </button>
              <button onClick={handleSearchGood} className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <hr />
      <ViewGood goods={goods} loading={loading} />
    </>
  );
}
