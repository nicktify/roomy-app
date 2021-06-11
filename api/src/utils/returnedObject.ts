import { ReturnPostDto } from "src/posts/dto/return-post-dto";
import { ReturnUserDto } from "src/users/dto/return-user.dto";

export const returnedUserObject = (object): ReturnUserDto => {
  const { _id, email, name, about, ownedRooms, participantRooms, profilePicture, profileBackground, socialMediaLinks } = object._doc;
  return {
    id: _id,
    email,
    name,
    about,
    ownedRooms,
    participantRooms,
    profilePicture,
    profileBackground,
    socialMediaLinks,
  }
}

export const returnedPostObject = (object): ReturnPostDto => {
  const { _id, roomId, authorId, authorProfilePicture, authorName, body, date, image } = object._doc;
  return {
    id: _id,
    roomId,
    authorId,
    authorProfilePicture,
    authorName,
    body,
    date,
    image,
  }
}