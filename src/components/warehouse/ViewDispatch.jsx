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
                      <i onClick={handleClick} className="bi bi-pencil-square bi-button" />
                      <i onClick={handleClick} className="bi bi-trash3-fill bi-button" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>No User Found ...</td>
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
