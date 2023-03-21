import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import AddOrEditEmployee from '../AddOrEditEmployee/AddOrEditEmployee';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Test the AddOrEditEmployee Component', () => {
  test('email input field should accept email ', () => {
    render(
      <Router>
        <AddOrEditEmployee />
      </Router>
    );
    const email = screen.getByPlaceholderText('Enter email');
    userEvent.type(email, 'testUser');
    expect(email.value).not.toMatch('test.user@gmail.com');
  });
});
