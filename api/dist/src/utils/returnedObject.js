"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnedUserObject = void 0;
const returnedUserObject = (object) => {
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
    };
};
exports.returnedUserObject = returnedUserObject;
//# sourceMappingURL=returnedObject.js.map