import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { TicketCard } from "@/app/tickets/ticket-card";

// Mock Supabase
vi.mock("@/lib/supabase/client", () => ({
    createClient: vi.fn(() => ({
        auth: {
            getSession: vi.fn().mockResolvedValue({
                data: {
                    session: {
                        access_token:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJlbmQtdXNlciJ9.mock",
                    },
                },
                error: null,
            }),
            getUser: vi.fn().mockResolvedValue({
                data: { user: { id: "test-user-123" } },
                error: null,
            }),
        },
        from: vi.fn(() => ({
            update: vi.fn().mockReturnThis(),
            delete: vi.fn().mockReturnThis(),
            eq: vi.fn().mockResolvedValue({ error: null }),
        })),
    })),
}));

// Mock jwt-decode
vi.mock("jwt-decode", () => ({
    jwtDecode: vi.fn(() => ({
        user_role: "end-user",
    })),
}));

// Mock ContextMenu
vi.mock("@/components/ui/context-menu", () => ({
    ContextMenu: ({ children }: any) => (
        <div data-testid="context-menu">{children}</div>
    ),
    ContextMenuTrigger: ({ children }: any) => <div>{children}</div>,
    ContextMenuContent: ({ children }: any) => <div>{children}</div>,
    ContextMenuItem: ({ children, onClick }: any) => (
        <div onClick={onClick}>{children}</div>
    ),
}));

// Mock UI components
vi.mock("@/components/ui/badge", () => ({
    Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}));

vi.mock("@/components/ui/card", () => ({
    Card: ({ children }: any) => <div data-testid="card">{children}</div>,
    CardHeader: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <h2>{children}</h2>,
    CardDescription: ({ children }: any) => <p>{children}</p>,
    CardContent: ({ children }: any) => <div>{children}</div>,
    CardFooter: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/alert-dialog", () => ({
    AlertDialog: ({ children }: any) => <div>{children}</div>,
    AlertDialogTrigger: ({ children }: any) => <div>{children}</div>,
    AlertDialogContent: ({ children }: any) => <div>{children}</div>,
    AlertDialogHeader: ({ children }: any) => <div>{children}</div>,
    AlertDialogTitle: ({ children }: any) => <h3>{children}</h3>,
    AlertDialogDescription: ({ children }: any) => <p>{children}</p>,
    AlertDialogFooter: ({ children }: any) => <div>{children}</div>,
    AlertDialogAction: ({ children }: any) => <button>{children}</button>,
    AlertDialogCancel: ({ children }: any) => <button>{children}</button>,
}));

vi.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children }: any) => <div>{children}</div>,
    DialogTrigger: ({ children }: any) => <div>{children}</div>,
    DialogContent: ({ children }: any) => <div>{children}</div>,
    DialogHeader: ({ children }: any) => <div>{children}</div>,
    DialogTitle: ({ children }: any) => <h3>{children}</h3>,
    DialogFooter: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/input", () => ({
    Input: (props: any) => <input {...props} />,
}));

vi.mock("@/components/ui/textarea", () => ({
    Textarea: (props: any) => <textarea {...props} />,
}));

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

const mockTicket = {
    heading: "Bug in login page",
    content: "The login button is not responding",
    email: "user@example.com",
    is_closed: false,
    timestamp: "2024-04-26T10:00:00Z",
    ticket_id: 1,
    closed_at: null,
};

describe("TicketCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render ticket heading", async () => {
        render(<TicketCard {...mockTicket} />);
        await waitFor(() => {
            expect(screen.getByText("Bug in login page")).toBeInTheDocument();
        });
    });

    it("should render ticket content", async () => {
        render(<TicketCard {...mockTicket} />);
        await waitFor(() => {
            // Get all elements with this text and filter to the description paragraph
            const elements = screen.getAllByText(
                "The login button is not responding",
            );
            const contentElement = elements.find((el) => el.tagName === "P");
            expect(contentElement).toBeInTheDocument();
        });
    });

    it("should display open status badge", async () => {
        render(<TicketCard {...mockTicket} />);
        await waitFor(() => {
            expect(screen.getByTestId("badge")).toBeInTheDocument();
        });
    });

    it("should display email address", async () => {
        render(<TicketCard {...mockTicket} />);
        await waitFor(() => {
            expect(screen.getByText("user@example.com")).toBeInTheDocument();
        });
    });

    it("should format timestamp correctly", async () => {
        render(<TicketCard {...mockTicket} />);
        await waitFor(() => {
            // The component formats the date, should contain month and time info
            const dateElements = screen.getAllByText(/April|2024|10:/);
            expect(dateElements.length).toBeGreaterThan(0);
        });
    });

    it("should render card component", async () => {
        render(<TicketCard {...mockTicket} />);
        await waitFor(() => {
            expect(screen.getByTestId("card")).toBeInTheDocument();
        });
    });

    it("should handle closed ticket", async () => {
        const closedTicket = { ...mockTicket, is_closed: true };
        render(<TicketCard {...closedTicket} />);
        await waitFor(() => {
            expect(screen.getByTestId("badge")).toBeInTheDocument();
        });
    });
});
