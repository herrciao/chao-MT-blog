import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { getTranslation } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Chao\'s background, experience, and the story behind this blog.',
  alternates: {
    canonical: '/en/about',
    languages: {
      'zh-TW': '/about',
      'en-US': '/en/about',
    },
  },
};

export default function EnglishAboutPage() {
  const locale = 'en';
  const t = getTranslation(locale);

  return (
    <Layout locale={locale}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t.about.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Hello! I'm Chao, a passionate software developer who loves technology and innovation. 
                  Welcome to my digital space where I share my learning and thoughts on programming, 
                  product development, and life.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8">
                  My Background
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  I have over X years of experience in software development, specializing in frontend development, 
                  full-stack architecture design, and product strategy. I've participated in various large-scale projects, 
                  from MVP development for startups to enterprise-level application architecture design. 
                  These experiences have given me deep insights into both technology and products.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8">
                  Technical Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Frontend Development</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• React / Next.js</li>
                      <li>• TypeScript / JavaScript</li>
                      <li>• Tailwind CSS</li>
                      <li>• Vue.js / Nuxt.js</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Backend Development</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Node.js / Express</li>
                      <li>• Python / Django</li>
                      <li>• PostgreSQL / MongoDB</li>
                      <li>• AWS / Docker</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8">
                  Why I Blog?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  I believe in the power of knowledge sharing. Through writing, I can not only organize 
                  my thoughts and learning insights but also help others solve problems or gain inspiration. 
                  This blog is where I record my growth journey, share practical experiences, and explore new technologies.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8">
                  Contact Me
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any thoughts, suggestions about my articles, or want to discuss technical issues, 
                  feel free to contact me through the following methods:
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href="mailto:your.email@example.com"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  <a
                    href="https://github.com/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Blog Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Posts</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tags</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Since</span>
                    <span className="font-semibold">2024</span>
                  </div>
                </div>
              </div>

              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Favorite Tools
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                    <span className="text-gray-700">VS Code</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-black rounded mr-3"></div>
                    <span className="text-gray-700">Terminal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                    <span className="text-gray-700">Figma</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
                    <span className="text-gray-700">Notion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

