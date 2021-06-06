export declare class ReturnUserDto {
    id: string;
    name: string;
    email: string;
    about: string;
    ownedRooms: string[];
    participantRooms: string[];
    profilePicture: string;
    profileBackground: string;
    socialMediaLinks: {
        facebook: string | null;
        instagram: string | null;
        twitter: string | null;
    };
}
