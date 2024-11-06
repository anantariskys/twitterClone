import React from "react";
import { Post } from "~/intefaces/post";


const getRelativeTime = (dateString: string) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} detik`;
  } else if (minutes < 60) {
    return `${minutes}m`; // menampilkan dalam menit
  } else if (hours < 24) {
    return `${hours}j`; // menampilkan dalam jam
  } else {
    return `${days}h`; // menampilkan dalam hari
  }
};


const TweetCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div key={post.id} className="border shadow-lg rounded-md p-4 space-y-3">
      <div>
        <div className="flex gap-2 text-primary">
          <small className="font-semibold">{post.user?.username}</small>
          <small className="text-gray-500">
            {getRelativeTime(post.created_at.toString())}
          </small>
        </div>
        <p className="text-sm">{post.content}</p>
      </div>
      {post.image && (
        <div className="flex gap-2">
          <div className="relative w-1/2 h-auto">
            <img
              src={post.image}
              alt={`Post image`}
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
