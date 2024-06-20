export interface ICreateStartup {
    title: string,
    description: String,
    creators?: String[],
    dateCreated: Date,
    stage: String
}

export interface IUpdateStartup {
    id?: string,
    title?: string,
    description?: String,
    creators?: String[],
    dateCreated?: Date,
    stage?: String
}