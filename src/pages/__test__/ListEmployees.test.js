import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import ListEmployees from '../ListEmployees/ListEmployees';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Test the ListEmployees Component', () => {
  test('render the button on the screen', async () => {
    render(
      <Router>
        <ListEmployees />
      </Router>
    );
    const buttonList = await screen.findAllByRole('button');
    expect(buttonList).toHaveLength(1);
  });
});
