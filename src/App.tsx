import { useState } from "react";
import "./App.css";
import ScoreTable from "./components/ScoreTable";
import Question from "./components/Question";
import Container from "./components/Container";

type QuestionType = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type AnswerResult = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
};

const questions: QuestionType[] = [
  {
    question: "Mis on Eesti pealinn?",
    options: ["Tallinn", "Tartu", "Narva"],
    correctAnswer: "Tallinn",
  },
  {
    question: "Kus asub Statistikaameti kontor Tartus?",
    options: ["Kvartalis", "Deltas", "Kaubamaja"],
    correctAnswer: "Deltas",
  },
  {
    question: "Mitu päeva on nädalas?",
    options: ["5", "7", "10"],
    correctAnswer: "7",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const answerResult: AnswerResult = {
      question: currentQuestion.question,
      selectedAnswer,
      isCorrect,
    };

    const updatedAnswers = [...answers, answerResult];
    setAnswers(updatedAnswers);

    setSelectedAnswer("");
    setShowFeedback(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const score = answers.filter((answer) => answer.isCorrect).length;

  if (quizFinished) {
    return (
      <ScoreTable
        answers={answers}
        score={score}
        totalQuestions={questions.length}
      />
    );
  }

  return (
    <main className="p-8 flex min-h-screen">
      <Container>
        <h1 className="text-title-lg">Viktoriin</h1>
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          correctAnswer={currentQuestion.correctAnswer}
          onAnswerChange={setSelectedAnswer}
          onSubmit={handleAnswerSubmit}
          onNext={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      </Container>
    </main>
  );
}

export default App;
