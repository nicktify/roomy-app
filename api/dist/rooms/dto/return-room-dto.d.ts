export declare class ReturnRoomDto {
    id: string;
    name: string;
    owners: string[];
    participants: string[];
    links: [
        {
            name: string;
            link: string;
        }
    ];
    dates: [
        {
            name: string;
            date: Date;
            description: string;
        }
    ];
    posts: [
        {
            authorId: string;
            body: string;
            date: Date;
        }
    ];
    books: [
        {
            name: string;
            description: string;
            link: string;
        }
    ];
}
