export interface Flashcard {
    question: string;
    answer: string;
    difficulty: string;
    subject: string;
}
export interface FlashcardSet {
    id: number;
    title: string;
    description: string;
}