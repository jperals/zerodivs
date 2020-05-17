export function isNotWriting(event) {
  return (
    event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA"
  );
}
