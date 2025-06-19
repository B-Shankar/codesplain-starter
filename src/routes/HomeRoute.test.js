import { screen, render } from "@testing-library/react";
import { setupServer } from 'msw/node';
import { rest } from "msw";
import { MemoryRouter } from 'react-router-dom';
import HomeRoute from "./HomeRoute";
import { afterEach, beforeAll, expect } from "@jest/globals";
import { createServer } from "../test/server";

createServer([
  {
    path: '/api/repositories',
    // method: 'get',
    res: (req) => {
      const language = req.url.searchParams.get('q').split('language:')[1];
      return {
        items: [
          {
            full_name: `${language}_one`,
            id: '1',
          },
          {
            full_name: `${language}_two`,
            id: '2',
          }]
      }
    }
  }
])



test('render 2 links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  const languages = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];
  for (let language of languages) {

    const link = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`, 'i')
    });

    expect(link).toHaveLength(2);
    expect(link[0]).toHaveTextContent(`${language}_one`);
    expect(link[1]).toHaveTextContent(`${language}_two`);
    expect(link[0]).toHaveAttribute('href', `/repositories/${language}_one`);
    expect(link[1]).toHaveAttribute('href', `/repositories/${language}_two`);
  }
});


const pause = () => new Promise(resolve => {
  setTimeout(resolve, 1000);
});