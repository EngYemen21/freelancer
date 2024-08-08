import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'ماهي منصة الوسيط الحر',
      answer:
        'منصة الوسيط الحر هي منصة يمنية تساعدك في الوصول إلى أفضل المستقلين المحترفين للتعاقد معهم للقيام بأعمالك ومشاريعك عبر الانترنت ، كذا تمكن المبدعين من إيجاد مكان للعمل وتحقيق دخل ..'
    },
    {
      question: 'كيف يمكن ان استفيد من منصة ؟',
      answer:
        'في منصة الوسيط الحر تستطيع نشر مشروعك كإنشاء موقع ويب أو تطبيق جوال أو حتى تصميم شعار وغيرها الكثير من التخصصات التي تحتاجها ، فتبدأ في تلقي عروض من المستقلين المحترفين المهتمين بالعمل على مشروعك لتقارن بين العروض وتختار أفضلها، ثم تقوم بتوظيف المستقل صاحب أفضل عرض وتتولى المتابعة معه حتى إتمام تنفيذ مشروعك، كما يمكنك البحث بنفسك عن أفضل المستقلين وتعرض عليهم مشروعك بشكل مباشر للعمل عليه ، توفر لك بيئة العمل للتعامل بشكل آمن وسريع مع كافة المستقلين.'
    },
    {
      question: 'كيف يمكن للمنصة ان تضمن حقي',
      answer:
        'في منصة الوسيط الحر تستطيع نشر مشروعك كإنشاء موقع ويب أو تطبيق جوال أو حتى تصميم شعار وغيرها الكثير من التخصصات التي تحتاجها ، فتبدأ في تلقي عروض من المستقلين المحترفين المهتمين بالعمل على مشروعك لتقارن بين العروض وتختار أفضلها، ثم تقوم بتوظيف المستقل صاحب أفضل عرض وتتولى المتابعة معه حتى إتمام تنفيذ مشروعك، كما يمكنك البحث بنفسك عن أفضل المستقلين وتعرض عليهم مشروعك بشكل مباشر للعمل عليه ، توفر لك بيئة العمل للتعامل بشكل آمن وسريع مع كافة المستقلين.'
    },
    {
      question: 'ماذا سوف يحدث بعد نشر منشوري على المنصه',
      answer:
        'بعد نشر مشروعك، سيبقى معلقًا بانتظار المراجعة من قبل الدعم الفني الخاص بالمنصه . وبعدها إمّا تتم الموافقة عليه فيصلك إشعار بالموافقة ثم يظهر المشروع لجميع المستقلين للتقدم بعروضهم عليه، أو يتم رفضه مع ذكر الأسباب التي أدت لذلك لكي تقوم بتعديله وإرساله من جديد للمراجعة والقبول.'
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <div className='bg-gray-50 '>
           <h2 className="text-2xl text-center font-bold py-4 mb-6">  الأسئلة الشائعة</h2>

    </div>

     <div className=" mb-4 " dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full bg-white rounded-lg shadow-md px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleAnswer(index)}
              >
                <span className="text-md font-medium">{faq.question}</span>
                <span className={`text-gray-500 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {activeIndex === index && (
                <div className="bg-white rounded-lg shadow-md px-6 py-4 mt-2">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
   
  );
};

export default FAQSection;