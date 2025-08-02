import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import ListTransfer from "./ListTransfer";
import '@testing-library/jest-dom';

const allItems = ['Item A', 'Item B', 'Item C', 'Item D'];

describe("ListTransfer", () => {
    test("1", async () => {
        const { container } = render(<ListTransfer allItems={allItems} />);
        expect(container).toMatchSnapshot();
        expect(screen.queryByText("Available")).toBeInTheDocument();
        let nodes = container.querySelectorAll(".left > li");
        console.log(nodes.length)
        expect(nodes.length).toBe(4);
        for (const el of nodes) {
            fireEvent.click(el);
        }
        fireEvent.click(screen.getByTestId("left-btn"));
        nodes = container.querySelectorAll(".left > li");
        console.log(nodes.length)
        expect(nodes.length).toBe(0);
        nodes = container.querySelectorAll(".right > li");
        console.log(nodes.length)
        expect(nodes.length).toBe(4);
    })
})