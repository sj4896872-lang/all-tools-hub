import React, { useState } from 'react';
import { Send, Mail, Shield, Scale, Info, CheckCircle2 } from 'lucide-react';

// --- ABOUT US PAGE ---
export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4" id="about-us-container">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">About All Tools Hub</h1>
      <p className="text-lg text-gray-650 dark:text-gray-300 mb-6 leading-relaxed">
        Welcome to <strong>All Tools Hub</strong>, the world's most comprehensive online calculator directory. We are committed to building the ultimate mathematical, physical, health, and financial computing platform on the web.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-white dark:bg-gray-850 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={18} />
            100% Free & Accessible
          </h3>
          <p className="text-sm text-gray-550 dark:text-gray-400">
            No premium walls, no subscriptions, and no registrations. Every calculator is open to everyone, anywhere in the world.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-850 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={18} />
            Mathematical Precision
          </h3>
          <p className="text-sm text-gray-550 dark:text-gray-400">
            Our calculators utilize standard scientific formulas, financial amortization math, and clinical physiological models vetted by experts.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
      <p className="text-gray-650 dark:text-gray-300 mb-6 leading-relaxed">
        Calculations shouldn't be confusing. We accompany every calculator with detailed, step-by-step math breakdowns, visual chart projections, mathematical formulas, real-world examples, and helpful FAQs. We empower students, homeowners, engineers, health professionals, and financial planners to get answers quickly and understand the logic behind them.
      </p>
    </div>
  );
}

// --- CONTACT PAGE ---
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4" id="contact-us-container">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">Contact Our Team</h1>
      <p className="text-gray-550 dark:text-gray-400 mb-8">
        Have questions, feedback, or custom calculator suggestions? Drop us a line! We usually respond within 24-48 business hours.
      </p>

      {submitted ? (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl p-6 text-center animate-fade-in">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-650 dark:text-green-400 mb-4">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message Sent Successfully!</h3>
          <p className="text-sm text-gray-550 dark:text-gray-450">
            Thank you for reaching out, {formData.name}. Our developer team has received your message and will review it immediately.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs cursor-pointer transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="Calculator suggestion or feedback"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="Write details of your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Send size={16} />
            Send Secure Message
          </button>
        </form>
      )}

      <div className="mt-8 flex items-center gap-3 justify-center text-xs text-gray-450">
        <Mail size={16} />
        <span>Direct Email: support@alltoolshub.invalid</span>
      </div>
    </div>
  );
}

// --- PRIVACY POLICY ---
export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4" id="privacy-policy-container">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="text-blue-500" size={32} />
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Privacy & Cookie Policy</h1>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Last updated: June 30, 2026</p>

      <div className="prose prose-blue dark:prose-invert max-w-none text-sm text-gray-650 dark:text-gray-300 space-y-6 leading-relaxed">
        <p>
          At All Tools Hub, accessible from alltoolshub.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by All Tools Hub and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">1. Log Files</h3>
        <p>
          All Tools Hub follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">2. Cookies and Web Beacons</h3>
        <p>
          Like any other website, All Tools Hub uses &quot;cookies&quot;. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">3. Google DoubleClick DART Cookie & AdSense Policies</h3>
        <p>
          Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">https://policies.google.com/technologies/ads</a>.
        </p>
        <p>
          Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on All Tools Hub, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that All Tools Hub has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">4. Google Analytics 4 (GA4) & Tracking Technologies</h3>
        <p>
          We utilize Google Analytics 4 (GA4) to collect data regarding visitor traffic and usage patterns. This service uses anonymous identifiers and does not associate IP addresses with personally identifiable information. We comply fully with Google Analytics Terms of Service. Users can choose to opt out of Google Analytics tracking altogether by installing the Google Analytics Opt-out Browser Add-on.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">5. GDPR Data Protection Rights</h3>
        <p>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
        <p>
          Under the CCPA, among other rights, California consumers have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
        </ul>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact our team via the Contact Page.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">7. Consent Mode v2 Compliance</h3>
        <p>
          In accordance with European regulations, All Tools Hub integrates Google Consent Mode v2. This model guarantees that Google Analytics and Google AdSense tags dynamically adjust their behavior based on your cookie consent selection. If you decline consent, our tags perform cookie-less pings, preserving your privacy while allowing us to collect non-personal aggregated metrics.
        </p>
      </div>
    </div>
  );
}

// --- TERMS & CONDITIONS ---
export function TermsConditions() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4" id="terms-conditions-container">
      <div className="flex items-center gap-3 mb-4">
        <Scale className="text-blue-500" size={32} />
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Terms & Conditions</h1>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Last updated: June 30, 2026</p>

      <div className="prose prose-blue dark:prose-invert max-w-none text-sm text-gray-650 dark:text-gray-300 space-y-6 leading-relaxed">
        <p>
          Welcome to All Tools Hub! These terms and conditions outline the rules and regulations for the use of All Tools Hub's Website, located at alltoolshub.com.
        </p>
        <p>
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use All Tools Hub if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">1. Intellectual Property</h3>
        <p>
          Unless otherwise stated, All Tools Hub and/or its licensors own the intellectual property rights for all material on All Tools Hub. All intellectual property rights are reserved. You may access this from All Tools Hub for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">2. Disclaimer of Mathematical Liability</h3>
        <p>
          The calculators, formulas, equations, and steps provided on All Tools Hub are for general educational and informational purposes only. We make no representations or warranties regarding the mathematical absolute accuracy, commercial fitness, or reliability of any output value generated. Any reliance on computational results is strictly at your own risk.
        </p>
      </div>
    </div>
  );
}

// --- DISCLAIMER PAGE ---
export function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4" id="disclaimer-container">
      <div className="flex items-center gap-3 mb-4">
        <Info className="text-blue-500" size={32} />
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Disclaimer</h1>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Last updated: June 30, 2026</p>

      <div className="prose prose-blue dark:prose-invert max-w-none text-sm text-gray-650 dark:text-gray-300 space-y-6 leading-relaxed">
        <p className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 text-red-750 dark:text-red-400 rounded-r-lg font-medium">
          The information contained in this website is for general educational and calculation purposes only. It is not intended as financial, medical, or legal advice.
        </p>
        <p>
          All calculations done by All Tools Hub should be double-checked before making critical decisions such as buying real estate, adjusting medical dosages, investing in financial securities, or designing mechanical and structural objects.
        </p>
        <p>
          Under no circumstance shall All Tools Hub be liable for any special, direct, indirect, consequential, or incidental damages arising out of the use of these dynamic formulas.
        </p>
      </div>
    </div>
  );
}
