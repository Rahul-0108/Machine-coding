import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import ListTransfer from "./ListTransfer";
import UserListWithDetails from "./Users";
import '@testing-library/jest-dom';


describe("UserListWithDetails", () => {
    test("1", async () => {
        jest.clearAllMocks();
        const users =[{ id: 1, name: "User" }, { id: 2, name: "User2" }]
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(users)
        }));
        const { container } = render(<UserListWithDetails />);
        expect(container).toMatchSnapshot();
        await waitFor(() => {
            const node = container.querySelectorAll('.user-card');
            console.log(node)
            expect(node.length).toBe(2);
        });
       fireEvent.click(screen.getAllByText('Show Details')[0]);
       expect(screen.getByText('Hide Details')).toBeInTheDocument();
    })
})