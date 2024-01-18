import { Link } from "react-router-dom";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          <strong>Docs </strong>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <SignedOut>
            <SignInButton className="btn btn-outline-primary" />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
