import { IPopularAuthors } from '../../../../types/user';
import { Link } from 'react-router-dom';
import {
  SeeAllLink,
  SidebarAdditionalInfo,
  SidebarContainer,
  SidebarHeader,
  SidebarInfoFirstRow,
  SidebarItemTitle,
  SidebarItemUsername,
  SidebarList,
} from '../../../styles/styledComponents/SidebarComponents';
import { useSidebarContext } from '../../../context/SidebarContext';

const PopularAuthorsSidebar = () => {
  const { authors } = useSidebarContext();

  return (
    <SidebarContainer>
      <SidebarHeader>Popular Authors</SidebarHeader>
      <SidebarList>
        {!!authors.length &&
          authors.slice(0, 5).map((author: IPopularAuthors) => {
            if (!author) return null;
            const { likesCount, _id, username, firstName, lastName } = author;
            return (
              <li key={_id}>
                <Link to={`/user/${_id}`}>
                  <SidebarInfoFirstRow>
                    <SidebarItemTitle>
                      {firstName} {lastName}
                    </SidebarItemTitle>
                    <SidebarItemUsername>@{username}</SidebarItemUsername>
                  </SidebarInfoFirstRow>
                  <SidebarAdditionalInfo>{likesCount} Likes</SidebarAdditionalInfo>
                </Link>
              </li>
            );
          })}
      </SidebarList>
      <SeeAllLink to={`/explore-authors`}>See the full list</SeeAllLink>
    </SidebarContainer>
  );
};

export default PopularAuthorsSidebar;
