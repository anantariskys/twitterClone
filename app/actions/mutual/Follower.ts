import { json } from '@remix-run/node';
import { prisma } from '~/db.server';

export const addFollower = async (userId: number, followingId: number) => {
    const follower = await prisma.userFollow.create({
        data: {
            followerId: userId,
            followingId: followingId,
        }
    })

    return json({message :"Follower added successfully", data: follower})
}


export const unfollow = async (userId: number, followingId: number) => {
    const unfllower =  await prisma.userFollow.deleteMany({
        where: {
            followerId: userId,
            followingId: followingId,
        },
    });
    return json({message :"Unfollowed", data: unfllower})
}