import { SignedIn } from "@clerk/nextjs";
import { CarFront, Link } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";


//   
//   return
//   <div>
//
//   </div>
// };

const Header = ({ isAdminPage }) => {
  const isAdmin = false;
  return (
    <div>
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        
        <nav className="mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={isAdminPage ? "/admin" : "/"}>
           
            <image
              src={"/logo.png"}
              alt="Vehiql Logo"
              width={200}
              height={60}
              className="h-12 w-auto object-contain"
            />
            {isAdminPage && (
              <span className="text-xs font-extralight">admin</span>
            )}
          </Link>
          <div>
            <SignedIn>
              <Link href="/saved-cars">
                <Button>
                  <CarFront size={18}/>
                  <span className="hidden md:inline">Saved Cars</span>
                  
                </Button>
              </Link>
            </SignedIn>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
