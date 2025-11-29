"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AnimatedImage from "./components/AnimatedImage/AnimatedImage";
export default function Home() {

  const [projects, setprojects] = useState([])
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [content, setcontent] = useState("")

  useEffect(() => {
    const handlegetprojects = async () => {
      try {
        const r = await fetch("/api/admin/get", { method: "GET" })
        const response = await r.json();
        if(response.success){
          setprojects(response.data);
        }else{
          setprojects([]);
        }
      } catch (error) {
        setprojects([]);
      }
    }
    handlegetprojects();
  }, [])

  const handleaddmessage = async (e) => {
    e.preventDefault();

    try {
      const r = await fetch("/api/user/addmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          content
        })
      });

      const result = await r.json();

      if (result.success) {
        toast.success("Message Sent Successfully!");
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      toast.error("An Internal Server Error Occurred!");
    }
  };

  return (
    <>
      <section className="fixed h-4 w-full ">
        <div className='h-fit px-2 py-3 rounded-lg border-b-2 flex justify-between items-center border-[#00ffff] bg-black'>
          <div className='flex items-end gap-2 ml-2 w-fit'>
            <h1 className='md:text-3xl text-2xl font-black text-white'>Ali Hassan</h1>
            <p className='text-white text-sm md:text-lg'>Full Stack Developer</p>
          </div>
          <div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden mr-6 text-white focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">
                {open ? "close" : "menu"}
              </span>
            </button>
            <div
              className={`${open ? "flex" : "hidden"
                } flex-col md:flex md:flex-row md:static absolute top-20 right-0 md:top-0 md:right-auto 
              bg-black border-2 md:border-none border-[#00ffff]  md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none 
              items-center w-[50vw] md:w-fit gap-4 md:gap-6 transition-all duration-300`}
            >
              <ul className='md:flex flex justify-center items-center flex-col gap-5  md:flex-row'>
                <Link onClick={() => setOpen(!open)} href="#home"><li className='hover:bg-[#00ffff] hover:font-black rounded-full px-1 py-0.5 hover:text-black text-white  hover:scale-110 active:bg-[#00ffff] active:scale-95 cursor-pointer'>Home</li></Link>
                <div className='w-[50vw] block md:hidden h-1 bg-[#00ffff]'></div>
                <Link onClick={() => setOpen(!open)} href="#projects"><li className='hover:bg-[#00ffff] hover:font-black rounded-full px-1 py-0.5 hover:text-black text-white  hover:scale-110 active:bg-[#00ffff] active:scale-95 cursor-pointer'>Projects</li></Link>
                <div className='w-[50vw] block md:hidden h-1 bg-[#00ffff]'></div>
                <Link onClick={() => setOpen(!open)} href="#about"><li className='hover:bg-[#00ffff] hover:font-black rounded-full px-1 py-0.5 hover:text-black text-white  hover:scale-110 active:bg-[#00ffff] active:scale-95 cursor-pointer'>About</li></Link>
                <div className='w-[50vw] block md:hidden h-1 bg-[#00ffff]'></div>
                <Link onClick={() => setOpen(!open)} href="#contact"><li className='hover:bg-[#00ffff] hover:font-black rounded-full px-1 py-0.5 hover:text-black text-white  hover:scale-110 active:bg-[#00ffff] active:scale-95 cursor-pointer'>Contact</li></Link>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="home" className=" scroll-smooth flex flex-row md:flex-col justify-center items-center   text-white px-4">
        <div className="bg-[rgba(0,0,0,0.5)] rounded-lg mt-30 md:mt-40 shadow flex flex-col md:flex-row gap-10 shadow-[#00ffff]">
          <div className="flex gap-6 px-6 py-4 md:w-[50%] flex-col">
            <span>Hi, I am</span>
            <span className="text-6xl font-bold ">ALI HASSAN</span>
            <span>Motivated and detail-oriented MERN Stack Developer with strong foundation in building responsive, efficient, and modren web applications.</span>
            <div className="flex flex-col">
              <span>Want to see my Projects!</span>
              <Link href={"#projects"} className="w-fit mt-1 px-2 py-1 rounded bg-[#00ffff] hover:bg-[#00cccc] scroll-smooth text-black transition">Projects</Link>
              <span className="ml-4 mt-2">Download my CV</span>
              <a href={"/Ali_Hassan_CV.pdf"} download={"ALI-HASSAN-CV.pdf"} className="w-fit mt-2 px-2 py-1 rounded bg-[#00ffff] hover:bg-[#00cccc] text-black transition">Download</a>

            </div>
          </div>
          <div className="w-[50%] h-fit">
            <AnimatedImage />
          </div>
          <div>

          </div>
        </div>
      </section>
      <div className="bg-[#00ffff] h-1 w-full my-4"></div>
      <section id="about" className=" scroll-smooth flex justify-center items-center text-white px-4">
        <div className="flex flex-col my-10 rounded-lg  bg-black shadow shadow-[#00ffff] w-[95vw] h-[80%]">
          <h1 className="text-4xl font-bold text-center mb-8 mt-8">About Me</h1>

          <div className="  px-4 md:flex-row w-full flex flex-col">
            <div className="md:w-[50%] w-full px-4">
              <h2 className="font-bold text-2xl">Overview:</h2>
              <p className="ml-2 text-lg">Full-Stack Website Developer with experties in MongoD,Express.js, React,Node.js and Next.js.I create rsponsive and efficient applications that solve real-world problems.</p>
              <h2 className="font-bold text-2xl">Experience:</h2>
              <p className="ml-2 text-lg">Build full-stack projects with an experoence of over a year focusing on fast, responsive and user-friendly websites.</p>
              <h2 className="font-bold text-2xl">Skills:</h2>
              <p className="text-lg ml-2">I know HTML,CSS,Java Script , React, MongoDB,Node.js,Express.js,Next.js and testing applications to take you website to next level.!</p>
              <h2 className="font-bold text-2xl">Achievements:</h2>
              <p>I made a lot of projects including URL Shortner and An E-commerce Webiste to solve real world problems and bring a new innotiative to digital world.</p>
            </div>
            <div className="md:w-[50%] w-full px-4">
              <h2 className="font-bold text-2xl my-8">Skills:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-14 mb-4 px-4">
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/html.svg" width={50} height={50} alt={"logo"} />HTML</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/css.svg" width={50} height={50} alt={"logo"} />CSS</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/js.svg" width={50} height={50} alt={"logo"} />JavaScript</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/react.svg" width={50} height={50} alt={"logo"} />React</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/next.svg" width={50} height={50} alt={"logo"} />Next.js</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/node.svg" width={50} height={50} alt={"logo"} />Node.js</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/express.svg" width={50} height={50} alt={"logo"} />Express.js</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/mongo.svg" width={50} height={50} alt={"logo"} />MongoDB</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/git.svg" width={50} height={50} alt={"logo"} />Git</span>
                <span className=" px-4 py-2 bg-[#111111] min-w-[65%] rounded"> <span className="text-2xl font-bold"> •</span><Image src="/github.svg" width={50} height={50} alt={"logo"} />GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#00ffff] h-1 w-full my-4"></div>
      <section id="projects" className="flex scroll-smooth justify-center items-center flex-col">
        <div className="w-[95vw] rounded-lg bg-[rgba(0,0,0,0.5)] border border-[#00ffff] shadow shadow-[#00ffff] ">
          <h1 className="text-4xl text-white font-bold text-center mb-8 mt-8">Projects</h1>
          <div>
            {projects.length == 0 ? <h2 className="text-white text-center mb-4">No Projects to Show</h2>:<div className='md:grid flex justify-center items-center flex-col px-4 md:grid-cols-3 gap-8  md:mx-auto mt-8 text-white mb-4 '>
            {projects.map((project) => (
              <div key={project._id} className="border border-gray-700  rounded-lg p-4 my-4 w-[80vw] md:w-[20vw]">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-2">{project.description}</p>
                <Link href={project.projectURL} className="text-blue-500 cursor-pointer underline" target="_blank" rel="noopener noreferrer">
                  Project Link
                </Link>
                <div className="mt-2">
                  <img src={project.imageURL} alt={project.title} className="w-full h-auto rounded-lg" />
                </div>

              </div>
            ))
            }
          </div>}
          </div>
          
        </div>

      </section>
      <div className="bg-[#00ffff] h-1 w-full my-4"></div>
      <section id="contact" className="mb-4  flex flex-col justify-center items-center scroll-smooth">
        <div className="flex bg-[rgba(0,0,0,0.5)] rounded-lg md:flex-row flex-col w-[95vw] border border-[#00ffff] shadow shadow-[#00ffff]">
          <h1 className="text-4xl text-white font-bold text-center mb-8 mt-8">Contact</h1>

          <div className="text-white w-full flex flex-col justify-center items-center md:w-[50%] px-4 py-8">
            <span className="font-semibold text-lg">Contact me on <a className="text-blue-700 flex justify-center items-center gap-2 cursor-pointer" href="mailto:ali374hassan@gmail.com"><Image height={20} width={20} src={"/mail.svg"} alt="mail" /><span> Email:ali374hassan@gmail.com</span></a></span>
            <div className="flex flex-col justify-center items-center gap-2">
              <span className="font-semibold text-lg">My Social Media Accounts </span>
              <a target="_blank" className=" flex justify-center items-center gap-2 cursor-pointer" href="https://www.instagram.com/ali.hassan374?igh=NHliZjQ3dWN4bHZ4"><Image height={20} width={20} src={"/insta.svg"} alt="mail" /><span>@alihassan...374 </span></a>
              <a target="_blank" className=" flex justify-center items-center gap-2 cursor-pointer" href="https://vt.tiktok.com/ZSfxwACv5"><Image height={20} width={20} src={"/tiktok.svg"} alt="mail" /><span>@alihassan...374 </span></a>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-white md:w-[50%]">
            <h1 className="font-bold text-2xl mt-6">Send me your message:</h1>
            <form onSubmit={handleaddmessage} className="w-full mb-4 flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <label className="font-semibold text-xl" htmlFor="name">Name:</label>
                <input type="text" value={name || ""} onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" required className="bg-white w-[60%] px-1 py-2 text-black  rounded-lg outline-2 outline-[#00ffff]" />
              </div>
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <label className="font-semibold text-xl" htmlFor="name">Email:</label>
                <input type="Email" value={email || ""} onChange={(e) => setemail(e.target.value)} placeholder="Enter Your Email" required className="bg-white w-[60%] px-1 py-2 text-black  rounded-lg outline-2 outline-[#00ffff]" />
              </div>

              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <label className="font-semibold text-xl" htmlFor="name">Email:</label>
                <textarea type="message" value={content || ""} onChange={(e) => setcontent(e.target.value)} placeholder="Enter Your Message" required className="bg-white w-[60%] px-1 py-2 text-black  rounded-lg outline-2 outline-[#00ffff]" />
              </div>
              <button className="my-4 bg-[#00ffff] text-black px-1 py-1 rounded-lg active:scale-95 cursor-pointer " type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer
        theme="dark"
        position="bottom-center"
      />
    </>
  );
}