import React, { useState, useEffect } from 'react';
import { 
  Leaf, ArrowRight, CheckCircle2, AlertTriangle, Car, Zap, Utensils, 
  Trash2, ShoppingBag, RefreshCcw, Calendar, Activity 
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from 'recharts';

const SURVEY_DATA = [
  {
    category: "Transportation",
    icon: Car,
    maxScore: 8,
    questions: [
      {
        id: "q1",
        text: "1. What is your primary mode of daily transportation for work, college, or errands?",
        options: [
          { label: "Driving alone in a petrol/diesel car", points: 1 },
          { label: "Ridesharing, carpooling, or riding a motorcycle", points: 2 },
          { label: "Public transit (bus, metro, train)", points: 3 },
          { label: "Walking, cycling, or using an electric vehicle (EV)", points: 4 }
        ]
      },
      {
        id: "q2",
        text: "2. How frequently do you take domestic or international flights in a year?",
        options: [
          { label: "More than 5 times", points: 1 },
          { label: "3 to 5 times", points: 2 },
          { label: "1 to 2 times", points: 3 },
          { label: "I rarely or never fly", points: 4 }
        ]
      }
    ]
  },
  {
    category: "Energy",
    icon: Zap,
    maxScore: 12,
    questions: [
      {
        id: "q3",
        text: "3. How do you typically manage the temperature in your living space?",
        options: [
          { label: "AC/Heater runs almost constantly", points: 1 },
          { label: "Use AC/Heater moderately or only during extreme weather", points: 2 },
          { label: "Rely on fans, thick curtains, and natural ventilation", points: 3 },
          { label: "Exclusively use natural ventilation and energy-efficient control", points: 4 }
        ]
      },
      {
        id: "q4",
        text: "4. What is your habit regarding lights and electronic appliances when leaving a room?",
        options: [
          { label: "I frequently leave them on or plugged in on standby", points: 1 },
          { label: "I turn off lights, but leave appliances plugged in", points: 2 },
          { label: "I usually turn off lights and unplug major appliances", points: 3 },
          { label: "I always turn everything off and use smart plugs/power strips", points: 4 }
        ]
      },
      {
        id: "q5",
        text: "5. What is the average duration of your daily shower?",
        options: [
          { label: "More than 15 minutes", points: 1 },
          { label: "10 to 15 minutes", points: 2 },
          { label: "5 to 10 minutes", points: 3 },
          { label: "Under 5 minutes (or I use a bucket/low-flow showerhead)", points: 4 }
        ]
      }
    ]
  },
  {
    category: "Diet",
    icon: Utensils,
    maxScore: 12,
    questions: [
      {
        id: "q6",
        text: "6. Which of the following best describes your typical weekly diet?",
        options: [
          { label: "Meat is included in almost every meal", points: 1 },
          { label: "Meat is included a few times a week (flexitarian)", points: 2 },
          { label: "Vegetarian (dairy and eggs included)", points: 3 },
          { label: "100% Plant-based / Vegan", points: 4 }
        ]
      },
      {
        id: "q7",
        text: "7. How often do you consciously purchase locally sourced or seasonal produce?",
        options: [
          { label: "Rarely or never, I buy whatever is in the supermarket", points: 1 },
          { label: "Sometimes, if it's convenient", points: 2 },
          { label: "Most of the time, I try to check labels", points: 3 },
          { label: "Always, I buy from local farmers' markets or grow my own", points: 4 }
        ]
      },
      {
        id: "q8",
        text: "8. How do you handle leftover food and kitchen scraps?",
        options: [
          { label: "Throw them in the regular trash", points: 1 },
          { label: "Try to eat leftovers, but scraps go in the trash", points: 2 },
          { label: "Rarely waste food, but don't compost", points: 3 },
          { label: "Zero waste: I eat all leftovers and compost my kitchen scraps", points: 4 }
        ]
      }
    ]
  },
  {
    category: "Waste",
    icon: Trash2,
    maxScore: 8,
    questions: [
      {
        id: "q9",
        text: "9. How frequently do you use single-use plastics (e.g., plastic bags, cups)?",
        options: [
          { label: "Daily", points: 1 },
          { label: "A few times a week", points: 2 },
          { label: "Rarely, I try to avoid them when possible", points: 3 },
          { label: "Never, I strictly carry reusable bags, bottles, and cups", points: 4 }
        ]
      },
      {
        id: "q10",
        text: "10. Do you segregate your household waste for recycling?",
        options: [
          { label: "No, everything goes into one bin", points: 1 },
          { label: "I sometimes separate paper and plastic if a bin is nearby", points: 2 },
          { label: "I regularly separate dry recyclables from wet waste", points: 3 },
          { label: "I strictly segregate all waste (wet, dry, e-waste, hazardous)", points: 4 }
        ]
      }
    ]
  },
  {
    category: "Shopping",
    icon: ShoppingBag,
    maxScore: 12,
    questions: [
      {
        id: "q11",
        text: "11. What are your habits when it comes to buying clothing (fast fashion)?",
        options: [
          { label: "I frequently buy new clothes following trends", points: 1 },
          { label: "I buy new clothes a few times a year", points: 2 },
          { label: "I mostly buy high-quality, durable clothes meant to last", points: 3 },
          { label: "I primarily buy second-hand, thrift, or upcycle my clothing", points: 4 }
        ]
      },
      {
        id: "q12",
        text: "12. When purchasing appliances or electronics, do you check for energy efficiency?",
        options: [
          { label: "Never, I just look at the price and features", points: 1 },
          { label: "Sometimes, if it's a major appliance", points: 2 },
          { label: "Always, energy efficiency is a major deciding factor", points: 3 },
          { label: "I rarely buy new electronics; I repair or buy refurbished", points: 4 }
        ]
      },
      {
        id: "q13",
        text: "13. How do you dispose of old electronics (smartphones, laptops, batteries)?",
        options: [
          { label: "Throw them in the regular trash", points: 1 },
          { label: "Keep them in a drawer indefinitely", points: 2 },
          { label: "Give them away or sell them", points: 3 },
          { label: "Take them to a certified e-waste recycling center", points: 4 }
        ]
      }
    ]
  }
];

const RECOMMENDATIONS = {
  "Transportation": [
    "Carpooling & Ridesharing: Use apps to share the ride. It cuts your carbon footprint in half.",
    "Public Transit Days: Commit to taking the bus or metro just two days a week.",
    "Slow Travel: For journeys under 500 km, opt for trains instead of flying."
  ],
  "Energy": [
    "The 24°C Rule: Set your AC to 24°C. Every degree raised saves about 6% in electricity.",
    "Vampire Power: Unplug chargers and TVs when not in use to avoid standby drain.",
    "Bucket Bath: Switch to a bucket bath or install low-flow showerheads to save water."
  ],
  "Diet": [
    "Meatless Mondays: Substitute meat with plant-based proteins a few days a week.",
    "Buy Local: Purchase from local farmers to reduce 'food miles'.",
    "Composting: Set up a small compost bin for kitchen scraps to create fertilizer."
  ],
  "Waste": [
    "The Reusable Kit: Keep a cloth tote bag and a reusable bottle with you.",
    "Opt-Out of Cutlery: Actively check the 'Don't send cutlery' box on food delivery apps.",
    "Two-Bin System: Set up a basic wet/dry waste segregation system at home."
  ],
  "Shopping": [
    "Thrift and Upcycle: Explore thrift stores or buy durable staples instead of fast fashion.",
    "Energy Ratings: Look for high energy efficiency (BEE star) labels on new appliances.",
    "E-Waste Disposal: Find a local e-waste drop-off bin for safe electronics recycling."
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState('welcome'); // welcome, assessment, dashboard
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Data Persistence State
  const [previousHistory, setPreviousHistory] = useState(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('ecoRecommend_history');
    if (saved) {
      try {
        setPreviousHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleOptionSelect = (questionId, points) => {
    setAnswers(prev => ({ ...prev, [questionId]: points }));
  };

  const isAssessmentComplete = () => Object.keys(answers).length === 13;

  const handleAssessmentSubmit = () => {
    if (!isAssessmentComplete()) return;
    setIsSubmitting(true);
    
    // Calculate total score using simple logic
    let totalScore = 0;
    Object.values(answers).forEach(points => totalScore += points);

    // Save to LocalStorage
    const newHistory = {
      score: totalScore,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    localStorage.setItem('ecoRecommend_history', JSON.stringify(newHistory));
    
    // Update local state so it immediately shows up on refresh if needed,
    // though the dashboard will just read the current run's totalScore.
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000); // Simulated processing delay
  };

  const restartAssessment = () => {
    // Before restarting, update previous history from localStorage so they can compare
    const saved = localStorage.getItem('ecoRecommend_history');
    if (saved) {
      setPreviousHistory(JSON.parse(saved));
    }
    setAnswers({});
    setCurrentView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setCurrentView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-12">
      <div className="bg-emerald-100 p-6 rounded-full mb-8 shadow-inner relative">
        <Leaf size={80} className="text-emerald-600 animate-pulse" />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-950 mb-6 tracking-tight">
        EcoRecommend
      </h1>
      <p className="text-lg md:text-xl text-emerald-700 max-w-2xl mb-10 leading-relaxed">
        Discover how your daily choices impact the planet. Take our comprehensive lifestyle assessment to receive your sustainability score and personalized recommendations.
      </p>

      {/* Display previous history if it exists */}
      {previousHistory && (
        <div className="mb-10 bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center max-w-md w-full">
          <div className="flex items-center gap-2 text-emerald-600 mb-2 font-semibold">
            <Calendar size={18} />
            <span>Welcome back!</span>
          </div>
          <p className="text-slate-600">
            Your last assessment on <strong>{previousHistory.date}</strong> resulted in a score of <strong className="text-emerald-700 text-lg">{previousHistory.score}/52</strong>. Let's see if you've improved!
          </p>
        </div>
      )}

      <button 
        onClick={() => setCurrentView('assessment')}
        className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      >
        <span>Start Assessment</span>
        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const AssessmentForm = () => {
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / 13) * 100);

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="sticky top-16 z-40 bg-emerald-50/95 backdrop-blur-md pt-4 pb-6 border-b border-emerald-200 mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-emerald-900">Lifestyle Assessment</h2>
            <span className="text-emerald-700 font-bold">{answeredCount} / 13</span>
          </div>
          <div className="w-full bg-emerald-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-emerald-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-10">
          {SURVEY_DATA.map((categoryData, catIndex) => {
            const CategoryIcon = categoryData.icon;
            return (
              <div key={catIndex} className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="bg-emerald-700 px-6 py-4 flex items-center gap-3 text-white">
                  <CategoryIcon size={24} />
                  <h3 className="text-xl font-bold">{categoryData.category}</h3>
                </div>
                <div className="p-6 space-y-8">
                  {categoryData.questions.map((q) => (
                    <div key={q.id} className="space-y-4">
                      <p className="text-lg font-semibold text-slate-800">{q.text}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = answers[q.id] === opt.points;
                          return (
                            <label 
                              key={optIndex}
                              className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                isSelected 
                                  ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                                  : 'border-slate-100 hover:border-emerald-300 hover:bg-slate-50'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name={q.id} 
                                value={opt.points}
                                checked={isSelected}
                                onChange={() => handleOptionSelect(q.id, opt.points)}
                                className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <span className="ml-3 text-slate-700 leading-snug">{opt.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 mb-16 flex flex-col items-center">
          <button
            onClick={handleAssessmentSubmit}
            disabled={!isAssessmentComplete() || isSubmitting}
            className={`flex items-center justify-center gap-2 w-full max-w-md py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
              isAssessmentComplete() && !isSubmitting
                ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:-translate-y-1'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Processing Data...</span>
            ) : (
              <>
                <span>Generate Recommendations</span>
                <Activity size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    // Basic Logic for total score mapping
    let totalScore = 0;
    Object.values(answers).forEach(val => totalScore += val);
    
    let tierTitle = "";
    let tierColor = "";
    let tierMessage = "";

    if (totalScore <= 25) {
      tierTitle = "High-Impact Lifestyle";
      tierColor = "text-rose-600";
      tierMessage = "Highly Degrading. Your current habits contribute significantly to ecological degradation. By implementing the targeted changes below, you can drastically reduce your footprint.";
    } else if (totalScore <= 39) {
      tierTitle = "Moderate Impact";
      tierColor = "text-amber-500";
      tierMessage = "Moderate. You have an average environmental footprint. You make some eco-conscious choices, but there is substantial room for improvement in specific areas.";
    } else {
      tierTitle = "Eco-Champion";
      tierColor = "text-emerald-600";
      tierMessage = "Eco-Champion! Excellent work. Your lifestyle actively minimizes harm to the environment. Keep maintaining these habits and optimizing your footprint.";
    }

    // Data preparation for Recharts Radar Chart
    const radarData = SURVEY_DATA.map(category => {
      let catScore = 0;
      category.questions.forEach(q => {
        catScore += (answers[q.id] || 0);
      });
      // Calculate percentage based on max possible score for this category
      const percentage = Math.round((catScore / category.maxScore) * 100);
      
      return {
        subject: category.category,
        Score: percentage,
        fullMark: 100,
        rawScore: catScore,
        needsImprovement: percentage <= 60 // Threshold for recommendations
      };
    });

    return (
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
        
        {/* Main Score & Chart Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden mb-10">
          <div className="bg-emerald-950 p-6 sm:px-10 sm:py-8 flex flex-col md:flex-row justify-between items-center text-white gap-4">
            <div>
              <h2 className="text-3xl font-bold">Sustainability Dashboard</h2>
              <p className="text-emerald-200 mt-1">Data-driven insights into your ecological footprint</p>
            </div>
            {previousHistory && previousHistory.score !== totalScore && (
              <div className="bg-emerald-800 px-4 py-2 rounded-lg border border-emerald-700 flex items-center gap-2">
                <span className="text-sm text-emerald-200">Previous Score:</span>
                <span className="font-bold">{previousHistory.score}/52</span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-10 grid lg:grid-cols-2 gap-12 items-center bg-slate-50">
            {/* Left Col: Score & Context */}
            <div className="space-y-6">
              <div className="flex items-end gap-3">
                <span className={`text-7xl font-extrabold ${totalScore >= 40 ? 'text-emerald-600' : totalScore >= 26 ? 'text-amber-500' : 'text-rose-600'}`}>
                  {totalScore}
                </span>
                <span className="text-2xl text-slate-400 font-bold mb-2">/ 52</span>
              </div>
              
              <div className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border font-bold ${tierColor} border-current shadow-sm`}>
                  {totalScore >= 40 ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                  {tierTitle}
                </div>
                <p className="text-lg text-slate-700 leading-relaxed bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  {tierMessage}
                </p>
              </div>
            </div>

            {/* Right Col: Radar Chart via Recharts */}
            <div className="h-[350px] bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col items-center justify-center">
              <h4 className="text-slate-500 font-semibold mb-2 text-sm uppercase tracking-wider">Performance by Category (%)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`${value}% Sustainable`, 'Rating']}
                  />
                  <Radar
                    name="Sustainability"
                    dataKey="Score"
                    stroke="#059669"
                    strokeWidth={3}
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Dynamic Recommendations based on if/else threshold logic */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-emerald-950 border-b border-emerald-100 pb-4">
            Targeted Recommendations
          </h3>
          <p className="text-slate-600 mb-6">
            These suggestions are dynamically generated based on the areas where you scored lowest (under 60%).
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {radarData.filter(cat => cat.needsImprovement).length === 0 ? (
              <div className="col-span-full bg-emerald-50 p-8 rounded-2xl text-center border border-emerald-100">
                <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
                <h4 className="text-xl font-bold text-emerald-900">Excellent metrics across the board.</h4>
                <p className="text-emerald-700 mt-2">Continue your current habits. You require no remedial recommendations at this time.</p>
              </div>
            ) : (
              radarData.map((cat, idx) => {
                // Mapping for conditional rendering
                if (!cat.needsImprovement) return null; 
                
                const originalCategoryData = SURVEY_DATA.find(c => c.category === cat.subject);
                const CatIcon = originalCategoryData.icon;

                return (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                      <div className="bg-amber-100 p-3 rounded-xl text-amber-700">
                        <CatIcon size={24}/>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">{cat.subject}</h4>
                        <p className="text-sm text-slate-500">Score: {cat.Score}% - Action Required</p>
                      </div>
                    </div>
                    <ul className="space-y-4 flex-grow">
                      {RECOMMENDATIONS[cat.subject].map((rec, rIdx) => {
                        const [title, ...descArr] = rec.split(':');
                        const desc = descArr.join(':');
                        return (
                          <li key={rIdx} className="flex items-start gap-3 text-slate-600 text-sm">
                            <ArrowRight className="text-emerald-500 shrink-0 mt-1" size={16} />
                            <span>
                              <strong className="text-slate-800 block mb-0.5">{title}</strong> 
                              {desc}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-emerald-50/30 font-sans text-slate-800 flex flex-col">
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={goHome}
          >
            <Leaf className="text-emerald-600 group-hover:rotate-12 transition-transform" size={26} />
            <span className="font-extrabold text-xl text-emerald-950 tracking-tight">EcoRecommend</span>
          </div>
          
          <div className="flex gap-4">
            {currentView === 'dashboard' && (
              <button 
                onClick={restartAssessment}
                className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-100/50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCcw size={16} />
                Retake Assessment
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow pb-20">
        {currentView === 'welcome' && <WelcomeScreen />}
        {currentView === 'assessment' && <AssessmentForm />}
        {currentView === 'dashboard' && <Dashboard />}
      </main>

      <footer className="bg-emerald-950 text-emerald-200/60 py-6 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <Leaf className="mb-3 opacity-30" size={20} />
          <p className="text-sm font-medium text-emerald-200/80">Sustainable Lifestyle Recommendation System</p>
          <p className="text-xs mt-1">Applying Computer Science concepts to environmental solutions.</p>
        </div>
      </footer>
    </div>
  );
}