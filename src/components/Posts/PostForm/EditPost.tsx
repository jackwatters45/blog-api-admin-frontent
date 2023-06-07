import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import PostForm from './PostForm';
import { useUserContext } from '../../../context/UserContext';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (user?.userType !== 'admin' && user?._id !== post?.author._id)
    return <Navigate to={'/unauthorized'} />;

  return post ? <PostForm post={post} pageTitle={'Edit Post'} /> : null;
};

export default EditPost;
