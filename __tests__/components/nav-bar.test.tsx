import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/nav-bar";

describe("Navbar Component", () => {
  it("should render the Help-Desk logo", () => {
    render(<Navbar />);
    const logo = screen.getByText("Help-Desk");
    expect(logo).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Tickets")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  it("should have correct href for Tickets link", () => {
    render(<Navbar />);
    const ticketsLink = screen.getByText("Tickets").closest("a");
    expect(ticketsLink).toHaveAttribute("href", "/tickets");
  });

  it("should have correct href for Account link", () => {
    render(<Navbar />);
    const accountLink = screen.getByText("Account").closest("a");
    expect(accountLink).toHaveAttribute("href", "/account");
  });

  it("should have logo link pointing to home", () => {
    render(<Navbar />);
    const logoLink = screen.getByText("Help-Desk").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
