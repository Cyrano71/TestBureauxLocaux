import { RouterProvider, createMemoryRouter } from "react-router-dom";
import * as React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsPage from "./Products";

const FAKE_TEST_DATA_PRODUCTS = [
    {
        id: 0,
        title: "Fake title 1"
    },
    {
        id: 1,
        title: "Fake title 2"
    }
]

describe("Products component", () => {
  test("renders realestate react links", async () => {
    const routes = [
      {
        path: "realestate",
        element: <ProductsPage />,
        loader: () => FAKE_TEST_DATA_PRODUCTS,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ["/realestate"] });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getAllByRole('link'));
    const elements = screen.getAllByRole('link')
    expect(elements).toHaveLength(2);
    for (const index in elements) {
      expect(elements[index]).toHaveTextContent("RealEstate " + index);
      expect(elements[index]).toHaveAttribute("href", "/realestate/" + index);
    }
  });
});