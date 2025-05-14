function Home() {
  return (
    <div className="py-12 text-center">
      <h2 className="mb-6 text-4xl font-bold text-blue-800 dark:text-blue-300 animate-fade-in">
        እንኳን ወደ ሥራ ቀሚር ተግባር መተግበሪያ በደህና መጡ
      </h2>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        ተግባራቶችዎን በቀላሉ ያደራጁ፣ ይቆጣጠሩ እና ይከታተሉ።
      </p>
      <a
        href="/tasks"
        className="px-6 py-3 text-white transition duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
      >
        ተግባራትን ጀምር
      </a>
    </div>
  );
}

export default Home;