// This file contains TypeScript type definitions for API responses and requests.

export interface QuestionRequest {
    question: string;
}

export interface QuestionResponse {
    answer: string;
}

export interface SummarizationRequest {
    text: string;
}

export interface SummarizationResponse {
    summary: string;
    bulletPoints: string[];
    timestamps: string[];
    actionItems: string[];
}