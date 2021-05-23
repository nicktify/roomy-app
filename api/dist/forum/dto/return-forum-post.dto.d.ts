export declare class ReturnForumPostDto {
    id: string;
    roomId: string;
    authorId: string;
    authorProfilePicture: string;
    authorName: string;
    body: string;
    image: string;
    date: Date;
    latestComment: {
        id: string;
        authorId: string;
        authorName: string;
        authorProfilePicture: string;
        body: string;
    };
}
