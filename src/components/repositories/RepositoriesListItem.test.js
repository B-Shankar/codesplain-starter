import { screen, render } from"@testing-library/react";
import RepositoriesListItem from"./RepositoriesListItem";
import { MemoryRouter } from 'react-router-dom';
import { jest, test } from "@jest/globals";

function renderComponent() {
  const repository = {
    full_name: "facebook/react", 
    language: "JavaScript", 
    description : "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    owner : {
      login: "facebook"
    }, 
    name : "react",
    html_url: "https://github.com/facebook/react"
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test('show a link to the github home page of a repository', async() => {
  const repository = renderComponent();

  await screen.findByRole('img', { name: 'JavaScript' });

  const link = screen.getByRole('link', {
    name: /github repository/i
  });
  expect(link).toHaveAttribute('href', repository.html_url);
});


test('show a appropriate file icon', async() => {
  renderComponent();

  const icon = await screen.findByRole('img', { name: 'JavaScript' });
  expect(icon).toHaveClass('js-icon');
});


test('show a link to code editor page', async() => {
  const {repository} = renderComponent();

  await screen.findByRole('img', { name: 'JavaScript' });
  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login)
  })
  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});

