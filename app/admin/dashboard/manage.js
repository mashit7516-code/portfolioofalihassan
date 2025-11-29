"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'

function AdminPanel() {
  const [title, settitle] = useState("")
  const [projectURL, setprojectURL] = useState("")
  const [description, setdescription] = useState("")
  const [imageURL, setimageURL] = useState("")
  const [projects, setprojects] = useState([])
  const [messages, setmessages] = useState([])

  const handleaddproject = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch("/api/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageURL: imageURL,
          projectURL: projectURL
        })
      })
      const response = await r.json();
      if (!response.success) {
        toast.error("Failed to add project:", response.message);
      } else {
        toast.success("Project Added Successfully");
        setprojects((prev) => [
          ...prev,
          { title, description, imageURL, projectURL }
        ]);

        settitle("");
        setdescription("");
        setimageURL("");
        setprojectURL("");
      }
    } catch (error) {
      toast.error("Error adding project:", error);
    }
  }

  const handledelteproject = async (id) => {
    try {
      const r = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      }
      )
      const response = await r.json();
      if (!response.success) {
        toast.error("Failed to delete project:", response.message);
      } else {
        toast.success("Project Deleted Successfully");
        setprojects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error("Error deleting project:", error);
    }
  }

  useEffect(() => {
    const handlegetprojects = async () => {
      try {
        const r = await fetch("/api/admin/get", { method: "GET" })
        const response = await r.json();
        setprojects(response.data);
      } catch (error) {
        toast.error("Error fetching projects:", error);
      }
    }
    handlegetprojects();
  }, [])

  useEffect(() => {
    const getmessage = async () => {
      try {

        const r = await fetch("/api/user/getmessage");
        const result = await r.json();
        if (result.success) {
          toast.success(result.message)
          setmessages(result.data)
        } else {
          toast.error("An error occured!")
        }
      } catch (error) {
        toast.error("Internal Server Error")
      }

    }

    getmessage();
  }, [])


  const handleeditproject = async (id, title, description, imageURL, projectURL) => {
    try {
      const r = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      }
      )
      const response = await r.json();
      if (!response.success) {
        toast.error("An error occured!");
      } else {
        toast.success("Project is ready to edit!");
        settitle(title)
        setdescription(description)
        setimageURL(imageURL)
        setprojectURL(projectURL)
        setprojects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error("Error editing project:", error);
    }
  }

  const handledeletemessage = async (id) => {
    try {
      const r = await fetch("/api/user/deletemessage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      }
      )
      const result = await r.json();
      if (result.success) {
        toast.success("Message Deleted!")
        setmessages((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("An Error Occured!")
      }
    } catch (error) {
      toast.error("An error occured!")
    }
  }


  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-white'>
      <div className='my-4'><Link className='bg-[#00ffff] my-4 rounded-lg font-semibold active:scale-95 text-black px-2 py-1 ' href={"/"} >Return To Home</Link></div>
      <h1 className='text-3xl font-bold'>Admin Panel</h1>
      <div className='bg-black w-[80%] flex flex-col h-fit px-4 py-6'>
        <h2 className='text-xl font-semibold'>Add Products</h2>
        <form onSubmit={handleaddproject} className='flex flex-col gap-4 justify-center items-center'>
          <div>
            <label htmlFor="Project Name">Project Name</label>
            <input value={title} onChange={(e) => settitle(e.target.value)} type="text" className='bg-white w-[70vw]  p-2  rounded-lg text-black' />
          </div>
          <div>
            <label htmlFor="Project Name">Project Link</label>
            <input value={projectURL} onChange={(e) => setprojectURL(e.target.value)} type="text" className='bg-white w-[70vw]  p-2 rounded-lg text-black' />
          </div>
          <div>
            <label htmlFor="Project Name">Project Description</label>
            <input value={description} onChange={(e) => setdescription(e.target.value)} type="text" className='bg-white w-[70vw]  p-2 rounded-lg text-black' />
          </div>
          <div>
            <label htmlFor="Project Name">Project Image Link</label>
            <input value={imageURL} onChange={(e) => setimageURL(e.target.value)} type="text" className='bg-white w-[70vw] p-2  rounded-lg text-black' />
          </div>
          <button type="submit" className='w-fit bg-[#00ffff] px-2 py-1 active:scale-95 rounded-lg text-black'>Submit</button>
        </form>
      </div>
      <div> 
        <h1 className="text-4xl text-white font-bold text-center mb-8 mt-8">Projects</h1>
           {projects.length == 0 ? (<div className='text-xl textwhite'>No Projects Found</div>):   (<div className='grid md:grid-cols-3 grid-cols-1 gap-4 md:w-[80vw] mt-8'>
({projects.map((project) => (
          <div key={project._id} className="border border-gray-700 rounded-lg p-4 my-4 w-[80vw] md:w-[20vw]">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="mb-2">{project.description}</p>
            <a href={project.projectURL} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              Project Link
            </a>
            <div className="mt-2">
              <img src={project.imageURL} alt={project.title} className="w-full h-auto rounded-lg" />
            </div>
            <div className='flex gap-2 mt-4'>
              <span className="material-symbols-outlined cursor-pointer active:scale-95" onClick={() => handledelteproject(project._id)}>delete</span>
              <span onClick={() => handleeditproject(project._id, project.title, project.description, project.imageURL, project.projectURL)} className="material-symbols-outlined cursor-pointer active:scale-95">edit</span></div>
          </div>
        ))
        
        }</div>)}
        
      </div>
      <div className='flex flex-col justify-center items-center mt-8 w-full'>
        <h2 className='text-2xl font-bold'>Messages</h2>
        <div className=''>
          {messages.length == 0 ? (<div>No Messages Found!</div>) : (<div className='grid md:grid-cols-3 grid-cols-1 gap-4 md:w-[80vw] mt-8'>
            {messages.map((item) => (
              <div key={item._id} className='border border-gray-700  text-white rounded-lg p-4 my-4 w-[80vw] md:w-[20vw]'>
                <h3 className='text-xl font-bold'>{item.name}</h3>
                <h4 className='text-lg font-semibold'>{item.email}</h4>
                <p>{item.content || ""}</p>
                <span className="material-symbols-outlined mt-4 cursor-pointer active:scale-95" onClick={() => handledeletemessage(item._id)}>delete</span>
              </div>
            ))}</div>)}

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminPanel