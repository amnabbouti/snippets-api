import {Request, Response} from 'express';
import Snippet, {ISnippet} from '../models/snippetModel';
import {config} from '../config/config';

// Create snippet
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
            code,
        });
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

// get all snippets ( i should have used pagination here)
export async function getAllSnippets(req: Request, res: Response) {
    try {
        const {
            language,
            tags,
            page = '1',
            limit = '10',
            sort = 'createdAt',
            order = 'desc',
        } = req.query;

        const query: any = {
            $or: [
                {expiresAt: {$exists: false}},
                {expiresAt: {$gte: new Date()}},
            ],
        };
        if (language) {
            query.language = {$regex: new RegExp(language as string, 'i')};
        }
        if (tags) {
            const tagArray = (tags as string).split(',').map((tag) => tag.trim());
            query.tags = {$all: tagArray.map((tag) => new RegExp(tag, 'i'))};
        }
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;
        const sortOrder = order === 'desc' ? -1 : 1;
        const sortField = sort as string;
        const snippets = await Snippet.find(query)
            .sort({[sortField]: sortOrder})
            .skip(skip)
            .limit(limitNum);
        const decodedSnippets = snippets.map((snippet) => ({
            ...snippet.toObject(),
            code: Buffer.from(snippet.code, 'base64').toString('utf-8'),
        }));
        const total = await Snippet.countDocuments(query);
        res.json({
            snippets: decodedSnippets,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalItems: total,
                limit: limitNum,
            },
        });
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

// Delete snippet
export async function deleteSnippet(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const snippet = await Snippet.findByIdAndDelete(id);
        if (!snippet) {
            return res.status(404).json({error: 'Snippet not found'});
        }
        if (config.nodeEnv === 'development') {
            console.log(`Snippet deleted: ${snippet.title}`);
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

// Update snippet
export async function updateSnippet(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const {title, code, language, tags, expiresIn} = req.body;
        const snippet = await Snippet.findById(id);
        if (!snippet) {
            return res.status(404).json({error: 'Snippet not found'});
        }
        if (snippet.expiresAt && snippet.expiresAt < new Date()) {
            return res.status(404).json({error: 'Snippet has expired'});
        }
        snippet.versionHistory.push({
            code: snippet.code,
            updatedAt: new Date(),
        });
        const updatedData: Partial<ISnippet> = {};
        if (title) updatedData.title = title;
        if (code) updatedData.code = Buffer.from(code).toString('base64');
        if (language) updatedData.language = language;
        if (tags) updatedData.tags = tags;
        if (expiresIn) updatedData.expiresAt = new Date(Date.now() + Number(expiresIn) * 1000);
        updatedData.updatedAt = new Date();

        const updatedSnippet = await Snippet.findByIdAndUpdate(
            id,
            {$set: updatedData},
            {new: true}
        );
        if (!updatedSnippet) {
            return res.status(404).json({error: 'Snippet not found'});
        }
        const decodedSnippet = {
            ...updatedSnippet.toObject(),
            code: Buffer.from(updatedSnippet.code, 'base64').toString('utf-8'),
        };
        if (config.nodeEnv === 'development') {
            console.log(`Snippet updated: ${updatedSnippet.title}`);
        }
        res.json(decodedSnippet);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}