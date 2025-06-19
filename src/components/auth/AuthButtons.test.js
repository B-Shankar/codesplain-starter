import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";
import { describe, test } from "@jest/globals";
import { SWRConfig } from "swr";

async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      {/* SWRConfig is used to provide a cache for the component */}
      {/* This is necessary because AuthButtons uses useUser hook which uses SWR */}
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole('link');

}

describe('when user is not signed in', () => {
  createServer([
    {
      path: '/api/user',
      // method: 'get',
      res: () => {
        return ({ user: null })},
    },
  ]);

  //createServer() --Get '/api/user' -- return { user: null }
  test('sign in and sign up buttons are shown', async () => {

    await renderComponent();
    
    const signInButton = screen.getByRole('link', { name: /sign in/i });
    const signUpButton = screen.getByRole('link', { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/signin');
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });
  test('signout is not shown', async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole('link', { name: /sign out/i });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

describe('when user is signed in', () => {
  createServer([
    {
      path: '/api/user',
      // method: 'get',
      res: () => {
        return ({
          user: {
            id: 1,
            email: 'OoKcM@example.com',
          },
        })
      }
    },
  ]); 

  // createServer() // Get '/api/user' -- return { user: { id: 1, email: 'OoKcM@example.com' } }
  test('signin and signup button is not shown', async () => {

    await renderComponent();

    const signInButton = screen.queryByRole('link', { name: /sign in/i });
    const signUpButton = screen.queryByRole('link', { name: /sign up/i });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });
  test('signout button is shown', async () => {
    await renderComponent();

    const signOutButton = screen.getByRole('link', { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute('href', '/signout');
  });
});
