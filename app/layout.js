import localFont from "next/font/local";
import Particles from "./components/Particles";
import "./globals.css";
import Footer from "./components/Footer";

const poppins = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
});
export const metadata = {
  title: "Ali Hassan's Portfolio",
  description: "A modern portfolio showcasing projects, skills, and experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        
      </head>
      <body
      className={`${poppins.variable} cursor-default`}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          <Particles
            particleColors={["#00ffff", "#00ffff","00ffff"]}
            particleCount={300}
            particleSpread={8}
            speed={0.3}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
<div className="min-h-screen max-h-fit">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
