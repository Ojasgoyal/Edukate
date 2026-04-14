import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';

export default function () {
  return (
    <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between pt-32 pb-16 gap-6 sm:gap-0'>
        <div className='flex flex-col items-center sm:items-start'>
            <div className='bg-amber-100 w-fit text-amber-800 text-center rounded-full text-xs md:text-sm px-4 py-1'>
                Now in beta — free for early educators
            </div>
            <div className='font-dm-serif text-4xl lg:text-6xl my-4'>
                <h1 className=''>Your courses.</h1>
                <h1 className=''>Your students.</h1>
                <h1 className='italic text-chart-3'>Your platform.</h1>
            </div>
            <div className='max-w-80 md:max-w-110 text-chart-3 balance leading-6'>
                Edukate gives independent educators a complete digital teaching infrastructure with
                course builder, student management, payments without a single line of code.
            </div>
            <div className='flex gap-4 my-6'>
                <Link  to="/login" className="bg-foreground text-background hover:bg-chart-3 text-sm font-medium py-3 px-6 rounded-sm transition duration-300">
                    Start for free
                </Link>
                <Link smooth to="#learn-more" className="bg-background text-foreground hover:text-chart-3 text-sm font-medium py-3 px-6 rounded-sm border border-chart-1 hover:border-chart-3 transition-all duration-300">
                    See how it works
                </Link>
            </div>
            <div>

            </div>
        </div>
        <div className='flex justify-center items-center'>
            <img src="course.png" width="500" alt="course-dashboard" />
        </div>
    </div>
  )
}


