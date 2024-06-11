import Spinner from "../Spinner";
import DeleteRecord from "../DeleteRecord";
import EditUser from "./EditUser";

function ViewUser({ users, loading,handleRemoveUser }) {

  return (
    <div className="table-content">
      <table className="table table-striped table-hover text-center table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Fullname</th>
            <th>Username</th>
            <th>Role</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            users.length > 0 ? (
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.username}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <EditUser title="Edit User" user={user} />
                      <DeleteRecord title="Remove User" handleRemove={()=>handleRemoveUser(user.id)} />
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
export default ViewUser;
