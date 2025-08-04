
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-trading-dark flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-lg">
          <div className="relative mb-8 mx-auto">
            <div className="h-32 w-32 rounded-full bg-trading-emerald/10 mx-auto flex items-center justify-center">
              <div className="text-8xl font-bold text-trading-emerald/30">?</div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-trading-emerald text-black text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center">
              404
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <Button className="bg-trading-emerald hover:bg-trading-emerald/90 text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
