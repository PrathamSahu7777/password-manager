import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [PasswordArray, setPasswordArray] = useState([])


    useEffect(() => {
        let Passwords = localStorage.getItem("passwords")
        if (Passwords) {
            setPasswordArray(JSON.parse(Passwords))
        }
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
        setPasswordArray([...PasswordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...PasswordArray, { ...form, id: uuidv4() }]))
        console.log([...PasswordArray, form])
        setform({ site: "", username: "", password: "" })
        // toast('Password saved!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",

        // });
        }
        else{
            alert("Password not saved!")
        }
    }

    const deletePassword = (id) => {
        let c = confirm("do you really want to delete this password?")
        if (c) {
            setPasswordArray(PasswordArray.filter(item => item.id != id))
            localStorage.setItem("passwords", JSON.stringify(PasswordArray.filter(item => item.id != id)))
            // toast('Password deleted!', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",

            // });
            console.log("deleted the password with id", id)
        }

    }

    const editPassword = (id) => {
        setform(PasswordArray.filter(item => item.id === id)[0])
        setPasswordArray(PasswordArray.filter(item => item.id != id))

    }


    const showPassword = () => {

        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/crosseye.png"
            passwordRef.current.type = "text"
        }

        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full text-center w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] text-center w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className='flex flex-col items-center px-1 md:px-0 mx-auto max-w-4xl min-h-[86.8vh]'>
                <h1 className='mt-3 text-2xl font-bold'>Pass'<span className='text-green-500'>ify</span></h1>
                <p className='text-sm'>Your own Password Manager</p>
                <div className="container flex flex-col gap-5 my-5 md:my-3 text-black">
                    <input type="text" placeholder="Enter website URL" className='rounded-full border border-green-700 px-3 py-1 text-sm' name="site" value={form.site} onChange={handleChange} />
                    <div className='text-center w-full flex flex-col md:flex-row gap-5 md:gap-3'>
                        <input type="text" placeholder="Enter Username" className='rounded-full w-full md:w-4/5 border border-green-700 px-3 py-1 text-sm' name="username" value={form.username} onChange={handleChange} />
                        <div className="relative text-center w-full md:w-1/5">
                            <input ref={passwordRef} type="password" placeholder="Enter Password" className='rounded-full w-full border border-green-700 px-3 py-1 text-sm ' name="password" value={form.password} onChange={handleChange} />
                            <span className='absolute right-3 top-0.5 cursor-pointer' onClick={showPassword} >
                                <img ref={ref} src="icons/eye.png" alt="eye" width="25" />
                            </span>
                        </div>
                    </div>
                </div>

                <button className='bg-green-500 hover:bg-green-400 rounded-full flex justify-center items-center w-24 py-2 m-1 gap-1 border border-green-900' onClick={savePassword}>
                    <lord-icon style={{ "width": "22px", "height": "22px" }}
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                    >
                    </lord-icon>
                    <div className='text-sm pb-0.5'>Save</div>
                </button>

                <div className="passwords w-full">
                    <div className='font-bold text-lg pl-1 md:pl-0 my-2'>Your Passwords</div>
                    {PasswordArray.length === 0 && <div>No Passwords to Show</div>}
                    {PasswordArray.length != 0 && <table class="table-fixed md:table-auto w-full rounded-md overflow-hidden mb-7">
                        <thead className='bg-green-800 text-white w-full'>
                            <tr className=''>
                                <th className='text-center w-1/4 md:w-32 py-2 '>Site</th>
                                <th className='text-center w-1/4 md:w-32 py-2'>Username</th>
                                <th className='text-center w-1/4 md:w-32 py-2'>Password</th>
                                <th className='text-center w-1/4 md:w-32 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 md:text-inherit'>
                            {PasswordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='border border-white py-1'>
                                        <div className='flex flex-col md:flex-row items-center justify-center gap-2'>
                                            <a href={item.site} target="_blank">{item.site}</a>
                                            <div className='copybtn size-7 pt-1.5 cursor-pointer' onClick={() => copyText(item.site)} >
                                                <lord-icon style={{ "width": "18px", "height": "18px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-white py-1'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span>{item.username}</span>
                                            <div className='copybtn size-7 pt-1.5 cursor-pointer' onClick={() => copyText(item.username)} >
                                                <lord-icon style={{ "width": "18px", "height": "18px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>

                                        </div>
                                    </td>
                                    <td className='border border-white py-1'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span> {item.password}</span>
                                            <div className='copybtn size-7 pt-1.5 cursor-pointer' onClick={() => copyText(item.password)} >
                                                <lord-icon style={{ "width": "18px", "height": "18px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-white py-1'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='editbtn size-7 cursor-pointer pt-0.5 pl-2' onClick={() => editPassword(item.id)}>
                                                <lord-icon style={{ "width": "20px", "height": "20px" }}
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                >
                                                </lord-icon>
                                            </div>
                                            <div className='deletebtn cursor-pointer' onClick={() => deletePassword(item.id)}>
                                                <lord-icon style={{ "width": "20px", "height": "20px" }}
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div >
        </>
    )
}

export default Manager
