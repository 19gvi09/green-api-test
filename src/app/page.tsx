import { ConnectForm } from "@/features/connect";

const Index = () => {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <section className="w-full max-w-sm rounded-max-xl border border-max-border bg-max-surface p-6 shadow-max-card">
        <div className="mb-8 space-y-2">
          <h1 className="text-xl font-semibold text-max-text">Подключение</h1>
          <p className="text-sm text-max-text-secondary">
            Введите данные вашего WhatsApp инстанса GREEN-API.
          </p>
        </div>
        <ConnectForm />
      </section>
    </main>
  );
};

export default Index;
