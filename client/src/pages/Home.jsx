function Home() {
  return (
    <div className="py-16 text-center py-80">
      <h2 className="mb-6 text-5xl font-extrabold text-gray-900 dark:text-white">
        እንኳን ወደ<span className="text-transparent bg-clip-text bg-gradient-to-r from-ethiopianBlue to-ethiopianGreen animate-slide-in"> ሥራ ቀምር</span> የተግባር መተግበሪያ በደህና መጡ!
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-200">
        ተግባራቶችዎን በቀላሉ ያደራጁ፣ ይቆጣጠሩ እና ይከታተሉ።
      </p>
      <a
        href="/tasks"
        className="inline-block px-8 py-4 text-white transition duration-300 transform bg-gradient-to-r from-ethiopianBlue via-ethiopianGreen to-ethiopianYellow rounded-xl hover:from-blue-700 hover:to-yellow-600 hover:scale-105 hover:shadow-xl animate-pulse-slow"
      >
        ተግባራትን ጀምር
      </a>
    </div>
  );
}

export default Home;