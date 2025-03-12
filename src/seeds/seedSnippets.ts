import mongoose from 'mongoose';
import Snippet, {ISnippet} from '../models/snippetModel';
import {config} from '../config/config';

interface SeedSnippet {
    title: string;
    code: string;
    language: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const seedData: SeedSnippet[] = [
    {
        title: "Async Function Example",
        code: "async function fetchData() { return await fetch(url); }",
        language: "JavaScript",
        tags: ["async", "fetch", "JavaScript"],
        createdAt: new Date("2025-03-12T14:30:00Z"),
        updatedAt: new Date("2025-03-12T14:30:00Z"),
    },
    {
        title: "Python List Comprehension",
        code: "[x**2 for x in range(10)]",
        language: "Python",
        tags: ["list", "comprehension", "Python"],
        createdAt: new Date("2025-03-12T14:31:00Z"),
        updatedAt: new Date("2025-03-12T14:31:00Z"),
    },
    {
        title: "Simple HTTP Server in Python",
        code: "from http.server import SimpleHTTPRequestHandler, HTTPServer\nserver = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)\nserver.serve_forever()",
        language: "Python",
        tags: ["http", "server", "Python"],
        createdAt: new Date("2025-03-12T14:32:00Z"),
        updatedAt: new Date("2025-03-12T14:32:00Z"),
    },
    {
        title: "Basic React Component",
        code: "const MyComponent = () => <h1>Hello, World!</h1>;\nexport default MyComponent;",
        language: "JavaScript",
        tags: ["React", "component", "JavaScript"],
        createdAt: new Date("2025-03-12T14:33:00Z"),
        updatedAt: new Date("2025-03-12T14:33:00Z"),
    },
    {
        title: "SQL Select Example",
        code: "SELECT * FROM users WHERE active = 1;",
        language: "SQL",
        tags: ["SQL", "database", "query"],
        createdAt: new Date("2025-03-12T14:34:00Z"),
        updatedAt: new Date("2025-03-12T14:34:00Z"),
    },
    {
        title: "Go Routine Example",
        code: "go func() { fmt.Println(\"Hello from Goroutine\") }()",
        language: "Go",
        tags: ["goroutine", "concurrency", "Go"],
        createdAt: new Date("2025-03-12T14:35:00Z"),
        updatedAt: new Date("2025-03-12T14:35:00Z"),
    },
    {
        title: "Rust Struct Example",
        code: "struct User { name: String, age: u8 }",
        language: "Rust",
        tags: ["Rust", "struct", "data"],
        createdAt: new Date("2025-03-12T14:36:00Z"),
        updatedAt: new Date("2025-03-12T14:36:00Z"),
    },
    {
        title: "C++ Lambda Example",
        code: "auto square = [](int x) { return x * x; };",
        language: "C++",
        tags: ["lambda", "C++", "functional"],
        createdAt: new Date("2025-03-12T14:37:00Z"),
        updatedAt: new Date("2025-03-12T14:37:00Z"),
    },
    {
        title: "Bash Loop Example",
        code: "for i in {1..5}; do echo $i; done",
        language: "Bash",
        tags: ["loop", "Bash", "shell"],
        createdAt: new Date("2025-03-12T14:38:00Z"),
        updatedAt: new Date("2025-03-12T14:38:00Z"),
    },
    {
        title: "Swift Closure Example",
        code: "let add = { (a: Int, b: Int) -> Int in return a + b }",
        language: "Swift",
        tags: ["closure", "Swift", "functional"],
        createdAt: new Date("2025-03-12T14:39:00Z"),
        updatedAt: new Date("2025-03-12T14:39:00Z"),
    },
];

async function seedDB() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB');
        await Snippet.deleteMany({});
        console.log('Cleared existing snippets');
        const snippetsToInsert: Partial<ISnippet>[] = seedData.map((snippet) => ({
            ...snippet,
            code: Buffer.from(snippet.code).toString('base64'),
        }));
        await Snippet.insertMany(snippetsToInsert);
        console.log('Database seeded with snippets');
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seedDB();