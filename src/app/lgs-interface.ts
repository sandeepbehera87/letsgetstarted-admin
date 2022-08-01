
export interface Questions {
    quetionTitle: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: string;
  }
  
  export interface QuestionSet {
    coursename: string,
    subject: string
    questionset: Questions[]
  }

  export interface LgsError {
    status: number;
    message: string;
    recoverable: boolean;
  }