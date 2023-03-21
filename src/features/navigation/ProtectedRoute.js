import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';

import { useUserAuth } from '../../context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#">Employee Details Admin Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              ></Nav>
              <Form className="d-flex">
                <div className="d-flex align-items-center text-light">
                  logged in as: <a href="#">{user.email}</a>
                </div>
                <Button
                  variant="primary"
                  onClick={handleLogout}
                  style={{ marginLeft: '8px', marginRight: '8px' }}
                >
                  LogOut
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {children}
      </div>
    );
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired
};

export default ProtectedRoute;
