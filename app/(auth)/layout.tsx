"use client"

import { ReactNode, useEffect, useState } from 'react'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const url = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    }

    return (
        <>
        <motion.div 
            className="min-h-screen flex items-start justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.main 
                className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100"
                variants={formVariants}
            >
                <div className='flex items-center justify-center p-4 m-3'>
                <Image src={"/anp-logo.png"} width={100} height={100} alt='ANP Logo'/>
                </div>
                <AnimatePresence mode="wait">
                    {url === "/login" ? (
                        <motion.div
                        className='flex flex-col items-center justify-center'
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white ">Login</h1>
                            <SignInForm/>
                            <Link href="/signup" className='text-center dark:text-white hover:text-red-500 dark:hover:text-red-500'>Don't have an account? Sign Up here</Link>
                        </motion.div>
                    ) : (
                        <motion.div
                        className='flex flex-col items-center justify-center'
                            key="signup"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Sign Up</h1>
                            <SignUpForm/>
                            <Link href="/login" className='text-center dark:text-white hover:text-red-500 dark:hover:text-red-500'>Already have an account? Sign in</Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.main>
        </motion.div>
        <motion.div 
            className="min-h-screen flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.main 
                className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100"
                variants={formVariants}
            >
               
            </motion.main>
        </motion.div>
        </>
    )
}
