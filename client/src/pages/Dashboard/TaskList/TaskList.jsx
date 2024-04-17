// import { useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
// import Example from "../../../components/Datatables/Datatables";
import TaskDatatable from "../../../components/Datatables/TaskDatatable";
// import { incomingSelector } from "../../../features/incoming/incomingSlice";

const TaskList = () => {
  // const {loader, message, error ,incomingFile} = useSelector(incomingSelector)
  //  // Assuming incomingFile is an object, render its specific properties
  //  const { task /* other properties */ } = incomingFile;
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
                    Task List
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <TaskDatatable />
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

export default TaskList;

//    {/* Render tasks */}
//    <div>
//    {task.map((taskItem, index) => (
//      <p key={index}>
//        Subject: {taskItem.subject}, file: {taskItem.file}
//        {/* Render other properties of the taskItem if needed */}
//      </p>
//    ))}
//  </div>
