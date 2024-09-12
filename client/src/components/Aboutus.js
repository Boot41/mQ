import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LazyLoad from 'react-lazyload';

// Team member data
const teamMembers = [
  { name: 'Anshuman Singh', description: 'Anshu loves tech and scalability...', image: 'placeholder.png' },
  { name: 'Harshit Singhal', description: 'Harshit loves business and has supercharged...', image: 'placeholder.png' },
  { name: 'Himanshu Varshney', description: 'Himanshu is a people person...', image: 'placeholder.png' },
  { name: 'Sripathi Krishnan', description: 'Sri is a tech guy...', image: 'placeholder.png' },
];

// Milestones data
const milestones = [
  { description: 'Analyze the current state of your company precisely and individually.' },
  { description: 'Develop a customized strategy for growth and improvement.' },
  { description: 'Implement the strategy with regular feedback and adjustments.' },
  { description: 'Achieve measurable results and ongoing support.' },
];

const AboutUs = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const animationControls = useAnimation();

  const journeyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start end', 'end start'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (inView) {
      animationControls.start({ opacity: 1, y: 0 });
    } else {
      animationControls.start({ opacity: 0, y: 50 });
    }
  }, [inView, animationControls]);

  // Ensure the cleanup of any potential lingering event listeners
  useEffect(() => {
    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <div className="space-y-16">
      {/* Who We Are Section */}
      <div className="bg-gray-800 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">WHO WE ARE</h2>
            <h3 className="text-4xl font-bold mb-6">
              Driving Essential Intelligence Through AI & Machine Learning
            </h3>
            <p className="text-lg mb-6">
              Think41 is the AI and Innovation Hub for S&P Global. We develop cutting-edge technologies that transform businesses.
            </p>
            <p className="text-lg">
              By pairing the latest advances in machine learning with the unparalleled breadth and depth of data at S&P Global, Kensho gives customers comprehensive, timely, actionable insights for making decisions with conviction.
            </p>
          </div>
          <div className="flex-1">
            <LazyLoad height={200} once>
              <img src="about2.webp" alt="Who We Are" className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </LazyLoad>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="bg-white text-black py-24">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">WHAT WE DO</h2>
            <p className="text-lg mb-6">
              Think41 leverages S&P’s world-class data to build machine learning applications internally for S&P Global and externally for our clients. We work primarily with natural language data, including complex documents and speech, and build machine learning models that add layers of structure to unstructured and semi-structured data.
            </p>
            <p className="text-lg mb-8">
              These foundational AI services improve the breadth and speed of data collection, the depth of data enrichment, and the effectiveness and relevance of data discovery, solving some of the most difficult challenges facing businesses today. Kensho’s solutions transform structured data into meaningful and actionable business insights.
            </p>
            <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out">
              About Our Solutions
            </button>
          </div>
          <div className="flex-1">
            <LazyLoad height={200} once>
              <img src="about3.jpg" alt="What We Do" className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </LazyLoad>
          </div>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="bg-gray-100 py-24">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2">
            <LazyLoad height={200} once>
              <img
                src="aboutpage.png"
                alt="blue background"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </LazyLoad>
          </div>

          <div className="md:w-1/2 flex flex-col items-start gap-6">
            <h2 className="text-orange-500 text-2xl font-semibold uppercase mb-4">Our Values</h2>
            <p className="text-3xl font-bold mb-6">
              We insist on action bias and minimizing unhelpful hierarchy and unnecessary process.
            </p>
            <p className="text-lg">
              We collaborate to understand our teammates’ diverse perspectives to solve hard problems together. 
              We dedicate work time and resources to explore new ideas and to learn new things. 
              We produce technology that is scalable, robust, and useful. 
              We communicate openly, honestly, efficiently, and with kindness for one another.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
        <h2 className="text-4xl font-semibold mb-6">Leadership Team</h2>
        <p className="text-gray-600 mb-12 text-center max-w-2xl">
          Aliquet egestas commodo dictum...
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg w-full md:w-96 h-auto overflow-hidden">
              {/* Image Card */}
              <div className="w-full md:w-1/2 h-64 md:h-full">
                <LazyLoad height={200} once>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </LazyLoad>
              </div>
              {/* Information Card */}
              <div className="flex-1 flex flex-col justify-center items-center p-4">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Journey Section */}
      <div ref={journeyRef} className="bg-gray-800 text-white min-h-screen py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-16 text-center">Our Journey</h1>

          {/* Vertical Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 bg-gray-600 w-1"
            style={{ height: '100%', scaleY: scaleY }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          ></motion.div>

          {/* Timeline Content */}
          <div className="relative flex flex-col items-center gap-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex w-full items-center mb-24"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div
                  className={`absolute ${index % 2 === 0 ? 'left-0' : 'right-0'} transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full`}
                ></div>
                <div className="flex flex-col items-center text-center max-w-lg">
                  <p className="bg-white text-black p-6 rounded-lg shadow-lg">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
