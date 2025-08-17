function Loading() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center gap-2 w-full h-full">
        <div className="rounded-full w-4 h-4 bg-primary animate-bounce"></div>
        <div className="rounded-full w-4 h-4 bg-primary animate-bounce [animation-delay:200ms]"></div>
        <div className="rounded-full w-4 h-4 bg-primary animate-bounce [animation-delay:400ms]"></div>
      </div>
    </div>
  );
}
export default Loading;
