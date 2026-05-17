import React from "react";

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Is the project legally verified?",
      a: "Yes, Dream Park Bettiah has 100% clear titles and all necessary approvals from the local authorities. You can review the papers anytime.",
    },
    {
      q: "Do you offer installment plans?",
      a: "Yes, we offer flexible installment plans to make it easier for you to invest. Contact our sales team for personalized options.",
    },
    {
      q: "When can I start construction?",
      a: "You can start construction immediately after the registry! The basic infrastructure like roads and plot marking is already in place.",
    },
    {
      q: "What is the booking amount?",
      a: "You can secure your plot with a nominal booking amount. Contact our sales team using the form below to get the exact payment schedule.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-emerald-950 text-white border-b border-emerald-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Got questions? We've got answers to help you make the best
            investment decision.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-8 bg-emerald-900/40 rounded-3xl border border-emerald-800/60 hover:bg-emerald-900/80 transition duration-300"
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-start gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center text-sm font-black mt-0.5">
                  Q
                </span>
                {faq.q}
              </h4>
              <p className="text-emerald-100/80 leading-relaxed ml-12 text-lg">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
