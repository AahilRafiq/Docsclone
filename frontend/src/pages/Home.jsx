// LandingPage.js

import React from 'react';
import {
    SignInButton,
    SignedIn,
    SignedOut,
  } from "@clerk/clerk-react";
  import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Docs</h1>
          <p className="text-lg mb-8">The Ultimate Collaborative Rich Text Editor</p>
          <div className="flex justify-center">
            <SignedOut>
                <SignInButton afterSignInUrl='/dashboard' className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold">Get Started</SignInButton>
            </SignedOut>
            <SignedIn>
                <Link to="/dashboard" className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold">Go to Dashboard</Link>
            </SignedIn>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Rich Text Editing</h3>
              <p className="text-gray-600">
                Enjoy a feature-rich text editor with formatting options, and more.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Real-time Collaboration</h3>
              <p className="text-gray-600">
                Collaborate with your team in real-time. See changes as they happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default LandingPage;
