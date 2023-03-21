import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './SearchedListEmployee.css';
import { fireDb } from '../../firebase';

const SearchedListEmployee = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Go Back
    </Tooltip>
  );

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const search = query.get('fName');

  const searchDataHandler = () => {
    fireDb
      .child('empDetails')
      .orderByChild('fName')
      .equalTo(search)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  useEffect(() => {
    searchDataHandler();
  }, [search]);

  return (
    <div>
      <div className="sub-nav-bar">
        <div>Employee Details List</div>
        <div className="pointer" onClick={() => navigate('/')}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
            </svg>
          </OverlayTrigger>
        </div>
      </div>

      <hr />

      <div className="row mb-3 mx-3">
        {Object.keys(data).length === 0 ? (
          <h2 className="text-center">
            No search found with that first name of an employee:{' '}
            {query.get('fName')}
          </h2>
        ) : (
          Object.keys(data).map((id, index) => {
            return (
              <div key={id} className="col-sm-6 mt-2">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{`${index + 1}. ${
                      data[id].fName
                    } ${data[id].mName} ${data[id].lName}`}</h5>
                    <p className="card-text">Email Id: {data[id].email}</p>
                    <p className="card-text">
                      Address: {`${data[id].address}`}
                    </p>
                    <Link to={`/view-emp/${id}`}>
                      <Button
                        data-testid="my_button"
                        size="sm"
                        variant="success"
                        className="mt-2"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchedListEmployee;
