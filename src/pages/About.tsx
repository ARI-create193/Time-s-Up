import React from 'react';

const founderImg = '/My photo.jpg';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Brand Story */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">About Time's Up</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Time's Up was born from a passion for luxury watches and a vision to create a trusted platform for enthusiasts and collectors. We believe every timepiece tells a story, and our mission is to connect people with the world’s most exceptional watches.
          </p>
        </section>
        {/* Meet the Founder (with social icons) */}
        <section className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow p-6">
          <img src={founderImg} alt="Aryan Omprakash Kaminwar" className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-800 mb-1">Meet the Founder</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aryan Omprakash Kaminwar</h3>
            <p className="text-gray-700 mb-2">Founder & Full Developer</p>
            <p className="text-gray-600 mb-2">I'm Aryan Omprakash Kaminwar, and I've always been fascinated by luxury watches. My passion for fine timepieces inspired me to create this platform—a place where watch lovers can discover and explore the world’s most exceptional watches. By combining my love for technology and horology, I aim to make the luxury watch experience accessible, trustworthy, and exciting for everyone.</p>
            <div className="flex gap-4 mt-2">
              {/* GitHub */}
              <a href="https://github.com/ARI-create193" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src="/github.png" alt="GitHub" className="w-7 h-7 hover:scale-110 transition" />
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/aryan-omprakash-kaminwar-ari-0b226328a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/linkdin.png" alt="LinkedIn" className="w-7 h-7 hover:scale-110 transition" />
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/iykyk_aarryyaan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/instagram.png" alt="Instagram" className="w-7 h-7 hover:scale-110 transition" />
              </a>
              {/* Gmail */}
              <a href="https://mail.google.com/mail/?view=cm&to=aryankaminwar@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                <img src="/gmail.png" alt="Gmail" className="w-7 h-7 hover:scale-110 transition" />
              </a>
            </div>
          </div>
        </section>
        {/* What Makes Us Different */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">What Makes Us Different</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Curated selection of authentic luxury watches</li>
            <li>Expert knowledge and a true love for horology</li>
            <li>Transparent, user-friendly experience</li>
            <li>Community-driven platform for watch lovers</li>
          </ul>
        </section>
        {/* Our Promise */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Our Promise</h2>
          <p className="text-gray-700">We guarantee authenticity and quality in every watch we offer. Our commitment is to provide a seamless, secure, and enjoyable experience for every customer.</p>
        </section>
        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Browse our curated collection of luxury watches</li>
            <li>Use filters to find your perfect timepiece</li>
            <li>Enjoy secure checkout and fast shipping</li>
            <li>Join our community and share your passion</li>
          </ol>
        </section>
        {/* Customer Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Customer Testimonials</h2>
          <div className="bg-blue-50 rounded-lg p-4 text-gray-700 italic">“I found my dream watch on Time's Up! The process was smooth and the team was incredibly helpful.” — Satisfied Customer</div>
        </section>
        {/* Fun Watch Facts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Fun Watch Fact</h2>
          <p className="text-gray-700">Did you know? The most expensive watch ever sold at auction is the Patek Philippe Grandmaster Chime, which fetched over $31 million!</p>
        </section>
        {/* Contact & Social Links */}
        <section className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Get in Touch</h2>
          <p className="text-gray-700 mb-2">Have questions or want to connect? Email me at <a href="mailto:aryankaminwar@gmail.com" className="text-blue-600 hover:underline">aryankaminwar@gmail.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default About; 