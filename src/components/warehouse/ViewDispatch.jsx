import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Spinner from "../Spinner";

function ViewDispatch({ records, loading }) {
  const handleClick = () => {
    alert("this feature still not implemented");
  };

  return (
    <div className="table-content" style={{height:"calc(100vh - 335px)"}}>
      <table className="table table-striped table-hover text-center table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Allocator</th>
            <th>Recipient</th>
            <th>Good</th>
            <th>Number</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            records.length > 0 ? (
              records.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.user.fullname}</td>
                    <td>{record.recipient}</td>
                    <td>{record.good.name}</td>
                    <td>{record.number}</td>
                    <td>
                      <FaPencil onClick={handleClick} color="blue" cursor="pointer" className="mx-2" />
                      <FaTrashCan onClick={handleClick} color="red" cursor="pointer" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7}>No Record Found ...</td>
              </tr>
            )
          ) : (
            <Spinner />
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ViewDispatch;
