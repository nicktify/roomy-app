export const returnedUserObject = (object) => {
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