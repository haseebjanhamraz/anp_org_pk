import { Metadata } from "next";
import { generateMetadata } from "../../../MetaData";
export const metadata: Metadata = generateMetadata("/terms-of-use");

export default function TermsOfUse() {
  return (
    <div className='dark:text-white'>
        <h1 className='text-4xl font-[Teko] dark:text-red-500'>Terms Of Use</h1>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Acceptance of Terms</h4>
        <p>
        By accessing and using the Awami National Party (ANP) website, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using our website.
        </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Intellectual Property Rights</h4>
        <p>
        All content on this website, including text, graphics, logos, images, and software, is the property of the ANP or its content providers and is protected by applicable intellectual property laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
          </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Use of Website</h4>
        <p>
        You are granted a limited, non-exclusive, and non-transferable license to access and use the website for personal, non-commercial purposes. You agree not to:
        </p>
        <ul>
            <li className='ml-4 list-disc'>
            Modify, copy, distribute, or transmit any content without prior written consent from the ANP.
            </li>
            <li className='ml-4 list-disc'>
            Use the website for any unlawful or prohibited activities.
            </li>
            <li className='ml-4 list-disc'>
            Attempt to gain unauthorized access to any part of the website or its systems.
            </li>
        </ul>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>User Contributions</h4>
        <p>
        If you submit any content to the website, including comments or suggestions, you grant the ANP a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content in any media. You are responsible for ensuring that your contributions do not violate any laws or infringe on the rights of third parties.
        </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Disclaimers</h4>
        <p>
        The website is provided "as is" and "as available" without any warranties, express or implied. The ANP does not guarantee the accuracy, completeness, or reliability of the content on the website. Your use of the website is at your own risk.
        </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Limitation of Liability</h4>
        <p>In no event shall the ANP be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of the website.</p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Links to Third-Party Websites</h4>
        <p>The website may contain links to external sites that are not operated by the ANP. We have no control over the content and practices of these sites and accept no responsibility for them. Accessing linked third-party websites is at your own risk.</p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Changes to Terms</h4>
        <p>
        The ANP reserves the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website constitutes acceptance of the revised terms.
        </p>
        <br/>
        <h4 className='text-2xl font-[Teko] dark:text-red-700'>Governing Law</h4>
        <p>
        These Terms of Use are governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in Pakistan.
          </p>

    </div>
  )
}
