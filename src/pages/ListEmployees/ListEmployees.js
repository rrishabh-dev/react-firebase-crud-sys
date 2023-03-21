import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import './ListEmployees.css';
import { toast } from 'react-toastify';
import { fireDb } from '../../firebase';

const ListEmployees = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [search, setSearch] = useState({});

  useEffect(() => {
    fireDb.child('empDetails').on('value', (data) => {
      if (data.val() !== null) {
        setData({ ...data.val() });
      } else {
        setData({});
      }
    });

    // useEffect's clean-up function
    return () => {
      setData({});
    };
  }, []);

  const handleClickDelete = (empId) => {
    if (
      window.confirm(
        "Are you sure that you want to delete this employee's details ??"
      )
    ) {
      fireDb.child(`empDetails/${empId}`).remove((err) => {
        if (err) toast.error(err);
        else toast.success('Employee Detail Deleted Successfully !!');
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-list-emp?fName=${search}`);
    setSearch('');
  };

  return (
    <div>
      <div className="sub-nav-bar">
        <div className="d-flex align-self-center">Employee Details List</div>
        <div className="d-flex align-self-center justify-content-space-between">
          <Button
            variant="primary"
            className="add-btn"
            onClick={() => navigate('/add-emp')}
          >
            + Add New Employee
          </Button>
          <form className="d-flex" onSubmit={handleOnSubmit}>
            <input
              type="text"
              aria-label="Search"
              className="form-control"
              placeholder="Search by first name..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>

      <hr />

      <div className="row mb-3 mx-3">
        {Object.keys(data).map((id, index) => {
          return (
            <div key={id} className="col-sm-6 mt-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{`${index + 1}. ${
                    data[id].fName
                  } ${data[id].mName} ${data[id].lName}`}</h5>
                  <p className="card-text">Email Id: {data[id].email}</p>
                  <p className="card-text">Address: {`${data[id].address}`}</p>
                  <Link to={`/edit-emp/${id}`}>
                    <Button size="sm" variant="primary" className="mt-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    className="mx-2 mt-2"
                    onClick={() => handleClickDelete(id)}
                  >
                    Delete
                  </Button>
                  <Link to={`/view-emp/${id}`}>
                    <Button size="sm" variant="success" className="mt-2">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListEmployees;
