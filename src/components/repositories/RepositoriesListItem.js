import { Link } from 'react-router-dom';
import FileIcon from '../tree/FileIcon';
import RepositoriesSummary from './RepositoriesSummary';
import { MarkGithubIcon } from "@primer/octicons-react";

function RepositoriesListItem({ repository }) {
  const { full_name, language, description, owner, name } = repository;

  return (
    <div className="py-3 border-b flex">
      <FileIcon name={language} className="shrink w-6 pt-1" />
      <div>
        <Link to={`/repositories/${full_name}`} className="text-xl">
          {owner.login}/<span className="font-bold">{name}</span>
        </Link>
        <p className="text-gray-500 italic py-1">{description}</p>
        <RepositoriesSummary repository={repository} />
      </div>
      <div className='grow flex items-center justify-end pr-2'>
        <a href={repository.html_url} aria-label="github repository">
          <MarkGithubIcon size={24} className="text-gray-500 hover:text-gray-700" />
        </a>
      </div>
    </div>
  );
}

export default RepositoriesListItem;
