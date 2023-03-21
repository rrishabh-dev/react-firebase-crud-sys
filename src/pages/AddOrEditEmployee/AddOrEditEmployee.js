import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Button, Form, Row } from 'react-bootstrap';

import './AddOrEditEmployee.css';
import { fireDb } from '../../firebase';

const initialState = {
  fName: '',
  mName: '',
  lName: '',
  gender: '',
  contact: 0,
  pan: 0,
  email: '',
  address: '',
  dob: '',
  bloodGroup: ''
};

const AddOrEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [state, setState] = useState(initialState);

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
  } = state;

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    // useEffect's clean-up function
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fName ||
      !lName ||
      !gender ||
      !contact ||
      !pan ||
      !email ||
      !address ||
      !dob ||
      !bloodGroup
    ) {
      toast.error('Please fill all mandatory fields');
    } else {
      if (!id) {
        fireDb.child('empDetails').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Employee details added successfully !!');
          }
        });
      } else {
        fireDb.child(`empDetails/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Employee details updated successfully !!');
          }
        });
      }

      setTimeout(() => navigate('/'), 500);
    }
  };

  return (
    <div className="add-edit-container">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              id="fName"
              name="fName"
              value={fName || ''}
              onChange={handleInputChange}
              placeholder="Enter first name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridMiddleName">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              id="mName"
              name="mName"
              value={mName || ''}
              onChange={handleInputChange}
              placeholder="Enter middle name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lName"
              name="lName"
              value={lName || ''}
              onChange={handleInputChange}
              placeholder="Enter last name"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={gender || ''}
              onChange={handleInputChange}
            >
              <option>Open select menu</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              id="contact"
              name="contact"
              value={contact || 0}
              onChange={handleInputChange}
              placeholder="Enter contact"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPAN">
            <Form.Label>PAN Number</Form.Label>
            <Form.Control
              type="number"
              id="pan"
              name="pan"
              value={pan || 0}
              onChange={handleInputChange}
              placeholder="Enter PAN"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={email || ''}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            id="address"
            name="address"
            value={address || ''}
            onChange={handleInputChange}
            placeholder="Enter full address"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              id="dob"
              name="dob"
              value={dob || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBloodGroup">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select
              name="bloodGroup"
              value={bloodGroup || ''}
              onChange={handleInputChange}
            >
              <option>Open select menu</option>
              <option value="O+">O+ve</option>
              <option value="A+">A+ve</option>
              <option value="A-">A-ve</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <div className="mt-2 d-flex justify-content-center">
          <Button variant="primary" type="submit" className="mx-2">
            {id ? 'Update' : 'Add'}
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOrEditEmployee;
