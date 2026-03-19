import Feedback from "./Feedback";

type QuestionProps = {
  question: string;
  options: string[];
  selectedAnswer: string;
  showFeedback: boolean;
  correctAnswer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  currentQuestionIndex: number;
};

function Question({
  question,
  options,
  selectedAnswer,
  showFeedback,
  correctAnswer,
  onAnswerChange,
  onSubmit,
  onNext,
  currentQuestionIndex,
}: QuestionProps) {
  console.log("currentQuestionIndex", currentQuestionIndex);
  return (
    <>
      <div>
        <h2 className="mb-2 text-body-lg">{question}</h2>

        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                disabled={showFeedback}
                onChange={(e) => onAnswerChange(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {!showFeedback ? (
        <button
          className="font-bold border w-max px-5 py-2 border-brand-black cursor-pointer bg-brand-black text-brand-white hover:bg-brand-white hover:text-brand-black transition-all ease disabled:bg-brand-gray-light disabled:text-brand-gray-dark disabled:border-none"
          onClick={onSubmit}
          disabled={!selectedAnswer}
        >
          Kontrolli
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <Feedback
            type={selectedAnswer === correctAnswer ? "success" : "error"}
            message={
              selectedAnswer === correctAnswer
                ? "Õige vastus!"
                : "Vale vastus! Õige vastus on: " + correctAnswer
            }
          />

          <button
            className="font-bold border w-max px-5 py-2 border-brand-black cursor-pointer bg-brand-black text-brand-white hover:bg-brand-white hover:text-brand-black transition-all ease"
            onClick={onNext}
          >
            {currentQuestionIndex === 2 ? "Lõpeta" : "Järgmine küsimus"}
          </button>
        </div>
      )}
    </>
  );
}

export default Question;
