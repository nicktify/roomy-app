"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnedPostObject = exports.returnedUserObject = void 0;
const return_post_dto_1 = require("../posts/dto/return-post-dto");
const return_user_dto_1 = require("../users/dto/return-user.dto");
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
const returnedPostObject = (object) => {
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
    };
};
exports.returnedPostObject = returnedPostObject;
//# sourceMappingURL=returnedObject.js.map