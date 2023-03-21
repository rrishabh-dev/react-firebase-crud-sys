import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './ViewEmployee.css';
import { fireDb } from '../../firebase';

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empDetail, setEmpDetail] = useState({});

  const handleGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    fireDb
      .child(`empDetails/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEmpDetail({ ...snapshot.val() });
        } else {
          setEmpDetail({});
        }
      });

    // useEffect's clean-up function
    return () => {
      setEmpDetail({});
    };
  }, [id]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Go Back
    </Tooltip>
  );

  const {
    fName,
    mName,
    lName,
    gender,
    contact,
    pan,
    email,
    address,
    dob,
    bloodGroup
  } = empDetail;

  return (
    <div className="w-100 mt-3 px-3">
      <Card className="mb-2">
        <Card.Header>
          <div className="d-flex flex-row justify-content-between">
            <div>Employee Personal Details</div>
            <div className="pointer" onClick={handleGoBack}>
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
        </Card.Header>
        <Card.Body>
          <Card.Title>{`${fName} ${mName} ${lName}`}</Card.Title>
          <Card.Text>
            <p>Contact No.: {`${contact}`}</p>
            <p>Email Id: {`${email}`}</p>
            <p>PAN: {`${pan}`}</p>
            <p>Address: {`${address}`}</p>
            <p>Gender: {`${gender}`}</p>
            <p>Date of Birth: {`${dob}`}</p>
            <p>Blood Group: {`${bloodGroup}`}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewEmployee;
