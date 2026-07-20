export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Privacy Policy & Terms</h1>

      <h2 className="mb-2 mt-6 text-xl font-semibold text-white">Information We Collect</h2>
      <p className="mb-4 text-slate-400">
        When you create an account, we store your name, email, and authentication details.
        When you browse properties, we log interactions (views, saves, inquiries) to power
        personalized recommendations — this data is never sold to third parties.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold text-white">How We Use AI</h2>
      <p className="mb-4 text-slate-400">
        Messages sent to our AI Assistant are processed by a third-party language model
        provider to generate responses. Conversation history is stored so the assistant can
        maintain context across your session.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold text-white">Listings</h2>
      <p className="mb-4 text-slate-400">
        Property owners are responsible for the accuracy of the listings they submit.
        GhorKhoj reserves the right to remove listings that violate our content guidelines.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold text-white">Contact</h2>
      <p className="text-slate-400">
        Questions about this policy can be sent to support@ghorkhoj.com.
      </p>
    </div>
  );
}