import type { Card } from "../types/card";

export const testData: Card[] = [
    {
        id: 1,
        category: "Python",
        question: "What is a \"callable\"?",
        answer: "A callable is an object we can call - function or an object implementing the __call__ special method. Any object can be made callable.",
    },
    {
        id: 2,
        category: "Python",
        question: "What is pickling/unpickling?",
        answer: "Pickling is converting an object to a string representation in python. Generally used for caching and transferring objects between hosts/processes.",
    },
];