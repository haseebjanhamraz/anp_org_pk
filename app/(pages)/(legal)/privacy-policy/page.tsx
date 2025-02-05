import { Metadata } from "next";
import { generateMetadata } from "../../../MetaData";
export const metadata: Metadata = generateMetadata("/privacy-policy")

export default function PrivacyPolicy() {
  return (
    <div className='dark:text-white'>
        <h1 className='text-4xl font-[Teko] dark:text-red-500'>Privacy Policy</h1>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Introduction</h4>
        <p>
        Welcome to the official website of the Awami National Party (ANP). We are committed to safeguarding the privacy of our visitors. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website.
        </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Information We Collect</h4>
        We may collect the following types of information:
        <ul>
            <li className='ml-4 list-disc'>
            Personal Identification Information: Name, email address, phone number, and any other information you voluntarily provide through contact forms or newsletter sign-ups.
            </li>
            <li className='ml-4 list-disc'>
            Non-Personal Identification Information: Browser type, operating system, referring URLs, and other technical information collected via cookies and similar technologies.
            </li>
        </ul>

        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>How We Use Collected Information</h4>
        <p>
        The ANP may use your information for the following purposes:
        </p>
        <ul>
            <li className='ml-4 list-disc'>
            To Improve Our Website: We continually strive to enhance our website offerings based on the information and feedback we receive from you.
            </li>
            <li className='ml-4 list-disc'>
            To Send Periodic Emails: If you opt-in to our mailing list, we may send you emails regarding party news, updates, or related information.
            </li>
        </ul>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Protection of Your Information</h4>
        <p>
        We implement appropriate data collection, storage, and processing practices to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
        </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Sharing Your Personal Information</h4>
        <p>
        We do not sell, trade, or rent users'
        </p>
    </div>
  )
}
