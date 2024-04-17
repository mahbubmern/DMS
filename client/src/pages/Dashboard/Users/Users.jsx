import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
// import Example from "../../../components/Datatables/Datatables";
import Datatables from "../../../components/Datatables/Datatables";

const Users = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <Breadcrumb />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {/* Recent Orders */}
              <div className="card card-table">
                <div className="card-header">
                  <h5 className="card-title" style={{ color: "red" }}>
                    {" "}
                    User List
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Datatables />
                  </div>
                </div>
              </div>
              {/* /Recent Orders */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
