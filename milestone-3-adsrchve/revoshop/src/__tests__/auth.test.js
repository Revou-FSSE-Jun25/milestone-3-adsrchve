/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Mock router dan next-auth
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock global fetch agar tidak error
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe("Login Page", () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls signIn on submit", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Mock signIn response
    signIn.mockResolvedValueOnce({ ok: true, error: null });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        username: "test@example.com",
        password: "password123",
        redirect: false,
      });
    });
  });

  it("navigates to homepage on successful login", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    signIn.mockResolvedValueOnce({ ok: true, error: null });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });
});
