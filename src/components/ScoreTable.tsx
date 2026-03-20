import Container from "./Container";

type AnswerResult = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
};

type ScoreTableProps = {
  answers: AnswerResult[];
  score: number;
  totalQuestions: number;
};

function getFinalMessage(score: number, totalQuestions: number): string {
  if (score === totalQuestions) {
    return "Suurepärane töö! Vastasid kõigile küsimustele õigesti.";
  }

  if (score >= 2) {
    return "Väga tubli! Sul läks väga hästi.";
  }

  if (score >= 1) {
    return "Hea tulemus! Veidi harjutamist ja läheb veel paremini.";
  }

  return "Proovi uuesti ja vaata, kas saad parema tulemuse.";
}

function ScoreTable({ answers, score, totalQuestions }: ScoreTableProps) {
  return (
    <main className="p-8 flex min-h-screen">
      <Container>
        <h1 className="text-title-lg">Viktoriini tulemused</h1>

        <div className="flex flex-col gap-2">
          <h2 className="text-body-lg" data-testid="final-score">
            Sinu skoor: {score} / {totalQuestions}
          </h2>
          <p className="text-body-md" data-testid="final-message">
            {getFinalMessage(score, totalQuestions)}
          </p>
        </div>

        <table
          className="w-full border-collapse border border-brand-gray-light"
          data-testid="results-table"
        >
          <thead>
            <tr>
              <th className="border border-brand-gray-light px-4 py-2 text-left">
                Küsimus
              </th>
              <th className="border border-brand-gray-light px-4 py-2 text-left">
                Sinu vastus
              </th>
              <th className="border border-brand-gray-light px-4 py-2 text-left">
                Tulemus
              </th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr key={index} data-testid={`result-row-${index}`}>
                <td className="border border-brand-gray-light px-4 py-2">
                  {answer.question}
                </td>
                <td className="border border-brand-gray-light px-4 py-2">
                  {answer.selectedAnswer}
                </td>
                <td className="border border-brand-gray-light px-4 py-2">
                  {answer.isCorrect ? "Õige" : "Vale"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </main>
  );
}

export default ScoreTable;
