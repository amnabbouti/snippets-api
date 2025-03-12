import {Schema, model, Document} from 'mongoose';

export interface ISnippet extends Document {
    title: string;
    code: string;
    language: string;
    tags: string[];
    expiresAt?: Date;
    versionHistory: { code: string; updatedAt: Date }[];
    createdAt: Date;
    updatedAt: Date;
}

const snippetSchema = new Schema<ISnippet>({
    title: {type: String, required: true},
    code: {type: String, required: true},
    language: {type: String, required: true},
    tags: [{type: String}],
    expiresAt: {type: Date},
    versionHistory: [{
        code: {type: String, required: true},
        updatedAt: {type: Date, default: Date.now},
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

export default model<ISnippet>('Snippet', snippetSchema);