import { Post } from '@prisma/client';
import React from 'react'
import TweetCard from '../TweetCard';

interface Props {
    posts: Post[];
  }
const UserPost:React.FC<Props> = ({posts}) => {
  return (
   <section className='p-4'>
    {
        posts.map((post)=>(
            <TweetCard post={post} key={post.id}/>
        ))
    }

   </section>
  )
}

export default UserPost
