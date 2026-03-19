type FeedbackType = "error" | "success";

type FeedbackProps = {
  type: FeedbackType;
  message: string;
};

function Feedback({ type, message }: FeedbackProps) {
  const styles = {
    error: "border-feedback-error bg-brand-white text-brand-black",
    success: "border-feedback-success bg-brand-white text-brand-black",
  };

  return (
    <div className={`border px-4 py-3 border-l-4 ${styles[type]}`} role="alert">
      <p>{message}</p>
    </div>
  );
}

export default Feedback;
