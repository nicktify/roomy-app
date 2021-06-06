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
    books: [
        {
            name: string;
            description: string;
            link: string;
        }
    ];
}
