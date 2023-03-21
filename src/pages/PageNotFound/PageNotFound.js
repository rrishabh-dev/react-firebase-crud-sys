import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <Card className="mb-2">
        <Card.Header>
          <div className="d-flex flex-row justify-content-between">
            <div>Employee Details Portal</div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>Page Not Found !!</Card.Title>
          <hr />
          <Card.Text>
            <h5>
              Looks like you have followed a broken link or entered a URL that
              does not exist in this site.
            </h5>
          </Card.Text>
          <Link to="/">
            <h4>Back to our site</h4>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PageNotFound;
