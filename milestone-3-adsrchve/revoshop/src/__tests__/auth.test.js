/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/login';
import { useRouter } from 'next/router';
import * as authUtils from '../utils/auth';

// ===== Mock Next.js router =====
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// ===== Mock auth utils =====
jest.mock('../utils/auth', () => ({
  login: jest.fn(),
  isLoggedIn: jest.fn(),
}));

describe('Login Page', () => {
  let pushMock, replaceMock;

  beforeEach(() => {
    pushMock = jest.fn();
    replaceMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock, replace: replaceMock });
    authUtils.isLoggedIn.mockReturnValue(false); // default belum login
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('navigates to homepage on successful login', async () => {
    authUtils.login.mockResolvedValue({ token: 'FAKE_TOKEN' });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // tunggu login selesai
    await screen.findByRole('button', { name: /login/i });

    expect(authUtils.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('shows error on failed login', async () => {
    authUtils.login.mockRejectedValue(new Error('login failed'));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByText(/login failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('redirects to checkout if already logged in', () => {
    authUtils.isLoggedIn.mockReturnValue(true); // user sudah login

    render(<LoginPage />);

    expect(replaceMock).toHaveBeenCalledWith('/checkout');
  });
});
