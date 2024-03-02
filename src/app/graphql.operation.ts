import { gql } from 'apollo-angular';

const GET_POSTS = gql`
  query getFriendsPost($userId: ID!) {
    getFriendsPost(userId: $userId) {
      postDetails
      postId
      postedAt
      username
      postImageUrl
      userProfileUrl
      comments {
        id
        body
        commenter{
          id
          username
          profilePic
        }
        commentAt
      }
      postLikedUsers
      totalLikes
    }
  }
`;

const GET_FIND_FRINEDS = gql`
  query getAllUsers($userId: ID!) {
    getAllUsers(userId: $userId) {
      id
      username
      profilePic
    }
  }
`;

const GET_POST_BY_ID = gql`
  query getPostById($postId: ID!) {
    getPostById(postId: $postId) {
      postDetails
      postId
      postedAt
      username
      postImageUrl
      userProfileUrl
      comments {
        id
        body
        commenter{
          id
          username
          profilePic
        }
        commentAt
      }
    }
  }
`;

const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      email
      createdAt
      isEnable
      profilePic
      coverPic
    }
  }
`;


const GET_POSTS_BY_USERNAME = gql`
  query getPostByUsername($username: String!) {
    getPostByUsername(username: $username) {
      postDetails
      postId
      postedAt
      username
      postImageUrl
      userProfileUrl
      comments {
        id
        body
        commenter{
          id
          username
          profilePic
        }
        commentAt
      }
      postLikedUsers
      totalLikes
    }
  }
`;



const GET_POST_LIKED_USERS = gql`
  query getPostLikedUsers($postId: ID!) {
    getPostLikedUsers(postId: $postId) {
      id
      username
      profilePic
    }
  }
`;


export { GET_POSTS };
export {GET_FIND_FRINEDS};
export {GET_POST_BY_ID};
export {GET_USER_BY_USERNAME};
export {GET_POSTS_BY_USERNAME}
export {GET_POST_LIKED_USERS}