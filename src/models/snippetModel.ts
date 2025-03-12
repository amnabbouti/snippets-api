import {Schema, model, Document} from 'mongoose';

export interface ISnippet extends Document {
    title: string;
    code: string; // Will store base64 encoded string
    language: string;
    tags: string[];
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const snippetSchema = new Schema<ISnippet>({
    title: {type: String, required: true},
    code: {type: String, required: true},
    language: {type: String, required: true},
    tags: [{type: String}],
    expiresAt: {type: Date},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

export default model<ISnippet>('Snippet', snippetSchema);