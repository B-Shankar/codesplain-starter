import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test('displays primary language of the repository', () => {
  const repository = {
    stargazers_count: 100,
    open_issues: 5,
    forks: 10,
    language: 'JavaScript'
  };

  render(<RepositoriesSummary repository={repository} />);

  const language = screen.getByText('JavaScript');
  expect(language).toBeInTheDocument();
});

test('displays information about the repository', () => {
  const repository = {
    language: 'Javascript',
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});