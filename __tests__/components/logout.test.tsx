import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Logout from "@/components/logout";

// Mock the logout action
vi.mock("@/app/login/actions", () => ({
  logout: vi.fn(),
}));

// Mock the Button component
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

describe("Logout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render logout button with text", () => {
    render(<Logout />);
    const button = screen.getByText("Logout");
    expect(button).toBeInTheDocument();
  });

  it("should render button element with correct container positioning", () => {
    const { container } = render(<Logout />);
    // Find the positioning container
    const positionedContainer = container.querySelector(".absolute.top-4.right-4.z-10");
    expect(positionedContainer).toBeInTheDocument();
  });

  it("should only render one logout button", () => {
    render(<Logout />);
    const buttons = screen.getAllByText("Logout");
    expect(buttons).toHaveLength(1);
  });

  it("should be in correct z-index layer", () => {
    const { container } = render(<Logout />);
    const wrapper = container.querySelector(".z-10");
    expect(wrapper).toBeInTheDocument();
  });
});
