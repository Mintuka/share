'use client'

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { readFile } from "@/utils/fileReader";

const Post = () => {
    const [submitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState({post: '', creator: '', tag: ''})
    const [images, setImages] = useState([{id: 1, image:''},{id: 2, image:'', name: ''},{id: 3, image:''},{id: 4, image:''},{id: 5, image:''},{id: 6, image:''}])
    const selectImage = (image: number) => {
      document.getElementById('file_'+image)?.click()
    }

    const createPost = async (e:any) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
          const response = await fetch("/api/post/new", {
            method: "POST",
            body: JSON.stringify({...data}),
          });

        } catch (error) {
          console.log('err',error);
        } finally {
          setIsSubmitting(false);
        }
      };

    const handleFile = (e:any, selectedIndex: number) => {
      readFile(e, (base64:any) => {
        setImages(() => {
          const updatedImages = images.map((data, index) => {
            if (index != selectedIndex) return data
            return {...data, image: base64}
          })
          return updatedImages
        })
      })
    }

    return (
        <>
          <div className="flex flex-col items-center p-4 w-full">
            <div className="flex flex-col w-3/4">
              <label htmlFor="post" className="mx-2">Pitch</label>
              <textarea name="post" id="post" placeholder="write your business idea" cols={30} rows={10} className="border outline-none p-2 m-2" disabled={submitting} value={data.post} onChange={(e:ChangeEvent<any>) => setData({...data, post: e.target.value})}/>
            </div>
            <div className="flex flex-col w-3/4 my-2">
              <label htmlFor="post" className="mx-2">Images</label>
              <div className="grid grid-cols-3 h-full">
                {
                  images.map(({id, image}, index) => {
                    return (
                      <div className="col-span-1 m-1">
                        <div className="flex items-center justify-center h-[150px] w-full cursor-pointer border-dashed border-2 rounded-sm" onClick={() => selectImage(id)}>
                          {!image && <div className="text-2xl text-[rgba(0,0,0,0.5)]">{id}</div>}
                          {image && <img src="/assets/images/jeff.jpg" className="w-full h-full object-cover" alt="file" />}
                        </div>
                        <input type="file" id={`file_${id}`} key={id} className="border hidden" onChange={(e) => handleFile(e, index)}/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="tag" className="mx-2">Tag</label>
              <input type="text" className="border outline-none p-2 m-2" disabled={submitting} onChange={(e:ChangeEvent<any>) => setData({...data, tag: e.target.value})}/>
              <label htmlFor="tag" className="mx-2">Team Size</label>
              <input type="text" className="border outline-none p-2 m-2" disabled={submitting} onChange={(e:ChangeEvent<any>) => setData({...data, tag: e.target.value})}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="tag" className="mx-2">Invites</label>
              <input type="text" className="border outline-none p-2 m-2" disabled={submitting} onChange={(e:ChangeEvent<any>) => setData({...data, tag: e.target.value})}/>
              <label htmlFor="tag" className="mx-2">Achievements</label>
              <input type="text" className="border outline-none p-2 m-2" disabled={submitting} onChange={(e:ChangeEvent<any>) => setData({...data, tag: e.target.value})}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="post" className="mx-2">Capital required</label>
              <input type="text" className="border outline-none p-2 m-2" disabled={submitting} onChange={(e:ChangeEvent<any>) => setData({...data, tag: e.target.value})}/>
              <label htmlFor="tag" className="mx-2">Targets Areas</label>
              <input type="text" className="border outline-none p-2 m-2" disabled={submitting} onChange={(e:ChangeEvent<any>) => setData({...data, tag: e.target.value})}/>
            </div>
            <button className="flex justify-center items-center w-3/4 bg-green-700 text-white p-2 m-2" onClick={createPost} disabled={submitting} >
              <div className="relative w-[fit-content] decoration-sky-500">
                Pitch
                {submitting && <Image src='assets/images/loading.svg' width={25} height={25} alt='loading' className="absolute top-0 left-[-30px]"/>}
              </div>
            </button>
          </div>
        </>
    )
}

export default Post