import Spinner from "../Spinner";

function ViewGoodType({ goodTypes, loading }) {
  const handleClick = () => {
    alert("this feature still not implemented");
  };
  return (
    <div className="table-content" style={{height:"calc(100vh - 195px)"}}>
      <table className="table table-striped table-hover text-center table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Good Type</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            goodTypes.length > 0 ? (
              goodTypes.map((goodType, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{goodType.name}</td>
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
export default ViewGoodType;
