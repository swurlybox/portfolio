export interface Post {
    _id: string,
    poster: string,
    title: string,
    description: string,
    imageFilePath?: string,
    createdAt: string,
    updatedAt: string
}