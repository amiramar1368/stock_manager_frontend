import Spinner from "../Spinner";

function ViewGood({ goods, loading }) {
  const handleClick = () => {
    alert("this feature still not implemented");
  };

  return (
    <div className="table-content" style={{height:"calc(100vh - 195px)"}}>
      <table className="table table-striped table-hover text-center table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Fullname</th>
            <th>Username</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            goods.length > 0 ? (
              goods.map((good, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{good.good_type.name}</td>
                    <td>{good.name}</td>
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
export default ViewGood;
