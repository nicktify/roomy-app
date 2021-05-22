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
        authorId: string;
        authorProfilePicture: string;
        body: string;
    };
}
