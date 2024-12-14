import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Check main features', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('adds a new todo', () => {
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('filters tasks by their completion status', () => {
    const input = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const allFilterButton = screen.getByText('All');
    fireEvent.click(allFilterButton);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    const activeFilterButton = screen.getByText('Active');
    fireEvent.click(activeFilterButton);
    expect(screen.queryByText('Task 1')).toBeNull();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    const completedFilterButton = screen.getByText('Completed');
    fireEvent.click(completedFilterButton);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).toBeNull();
  });
  
});
