export default function EmptyState() {
  return (
    <section className="mx-auto mt-12 w-full max-w-5xl px-4">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* TODO EMPTY */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/empty/todo-large.svg"
            alt="할 일 없음"
            className="mb-6 w-40 md:w-56"
          />
          <p className="mb-1 text-bodyBold text-slate-700">할 일이 없어요.</p>
          <p className="text-body text-slate-500">
            TODO를 새롭게 추가해주세요!
          </p>
        </div>

        {/* DONE EMPTY */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/empty/done-large.svg"
            alt="완료된 일 없음"
            className="mb-6 w-40 md:w-56"
          />
          <p className="mb-1 text-bodyBold text-slate-700">
            아직 다 한 일이 없어요.
          </p>
          <p className="text-body text-slate-500">해야 할 일을 체크해보세요!</p>
        </div>
      </div>
    </section>
  );
}
