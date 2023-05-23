import IPost from '../../../../types/post.d';
import { styled } from 'styled-components';
import ActivityContent from './ActivityContent';
import ActivityOptions from './ActivityOptions';
import IComment from '../../../../types/comment.d';

const LeftColumn = styled.div`
  width: 100%;
`;

const StyledH1 = styled.h1`
  font-size: 2.5rem;
`;

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

type Props = {
  name: string;
  comments: IComment[];
  posts: IPost[] | string[];
};

const Activity = ({ comments, posts, name }: Props) => {
  return (
    <LeftColumn>
      <StyledH1>{name}</StyledH1>
      <ActivityContainer>
        <ActivityOptions />
        <ActivityContent comments={comments} posts={posts} />
      </ActivityContainer>
    </LeftColumn>
  );
};

export default Activity;
