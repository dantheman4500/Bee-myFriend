import React from 'react';
import { useQuery, useMutation} from '@apollo/client';
import { GET_FRIENDS } from '../utils/queries';
import { CREATE_FRIENDSHIP,DELETE_FRIENDSHIP } from '../utils/mutations';



function Friends(props) {
  const { profileId } = props;
  const { loading, error, data } = useQuery(GET_FRIENDS, {
    variables: { profileId },
  });
  const [createFriendship] = useMutation(CREATE_FRIENDSHIP);
  const [deleteFriendship] = useMutation(DELETE_FRIENDSHIP);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <main>
      <h2 className="flex-row justify-center">Friends</h2>
      {data.profiles.friends.map(friend => (
        <div key={friend.id}>
          <p>{friend.firstName}</p>
          <button onClick={() => deleteFriendship({ variables: { id: friend.id } })}>
            Delete Friendship
          </button>
        </div>
      ))}
      <button onClick={() => createFriendship({ variables: { user1Id: profileId, user2Id: 'someOtherUserId' } })}>
        Add Friend
      </button>
    </main>
  );
}
export default Friends;
