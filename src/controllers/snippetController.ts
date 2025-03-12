import {Request, Response} from 'express';
import Snippet, {ISnippet} from '../models/snippetModel';
import {config} from '../config/config';

export async function createSnippet(req: Request, res: Response) {
    try {
        const {title, code, language, tags, expiresIn} = req.body;

        if (!title || !code || !language) {
            return res.status(400).json({error: 'Title, code, and language are required'});
        }

        const encodedCode = Buffer.from(code).toString('base64');

        const snippetData: Partial<ISnippet> = {
            title,
            code: encodedCode,
            language,
            tags: tags || [],
        };

        if (expiresIn) {
            snippetData.expiresAt = new Date(Date.now() + Number(expiresIn) * 1000);
        }

        const snippet = new Snippet(snippetData);
        await snippet.save();

        if (config.nodeEnv === 'development') {
            console.log(`Snippet created: ${title}`);
        }

        res.status(201).json({
            ...snippet.toObject(),
            code, // Return decoded code in response
        });
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}