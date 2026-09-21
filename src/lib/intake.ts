export type IntakeAnswerType =
  | "SINGLE"
  | "MULTI"
  | "TEXT"
  | "EMAIL"
  | "PHONE"
  | "ZIP"
  | "BOOLEAN"
  | "DATE"
  | "CONSENT";

export type QuestionOutcome = "CREATE_LEAD" | "REDIRECT" | "COMPLETE";

export type IntakeEdge = {
  id: number;
  choiceKey: string;
  choiceLabel: string;
  choiceDescription: string | null;
  outcome: QuestionOutcome | null;
  redirectUrl: string | null;
  toQuestionKey: string | null;
  sortOrder: number;
};

export type IntakeQuestion = {
  id: number;
  key: string;
  prompt: string;
  helpText: string | null;
  answerType: IntakeAnswerType;
  mapsToLeadField: string | null;
  sortOrder: number;
  edges: IntakeEdge[];
};

export type IntakeFlowPayload = {
  flow: {
    id: number;
    slug: string;
    name: string;
    version: number;
  };
  startQuestionKey: string;
  questions: IntakeQuestion[];
};

export type IntakeAnswerPayload = {
  questionKey: string;
  choiceKey?: string;
  value?: string | boolean;
};

export const TEXT_ANSWER_TYPES = new Set<IntakeAnswerType>([
  "TEXT",
  "EMAIL",
  "PHONE",
  "ZIP",
  "DATE",
  "CONSENT",
]);
