import { Metadata } from "next";
import { generateMetadata } from "../../../MetaData";
export const metadata: Metadata = generateMetadata("/copyright-policy");

export default function page() {
  return (
    <div className="dark:text-white">
      <h1 className="text-4xl font-[opensans] dark:text-red-500">
        Copyright Policy
      </h1>
      <p>
        The Awami National Party (ANP) has established a comprehensive Copyright
        Policy to uphold and respect intellectual property rights in accordance
        with Pakistan's Copyright Ordinance of 1962 and international standards.
      </p>
      <br />
      <br />
      <h4 className="text-2xl font-[opensans] dark:text-red-700">
        Copyright Ownership
      </h4>
      <p>
        All content on the ANP website, including text, images, videos, and
        other materials, is the exclusive property of the ANP or its content
        providers. This ownership is protected under the Pakistan Copyright
        Ordinance, 1962, which grants creators exclusive rights to reproduce,
        distribute, perform, and adapt their works.
      </p>
      <br />
      <h4 className="text-2xl font-[opensans] dark:text-red-700">
        Authorized Use of Content
      </h4>
      <p>
        The ANP permits individuals to electronically copy and print single
        pages from its website for personal, non-commercial use, provided that
        the content remains unaltered and is distributed without charge. This
        aligns with the fair use provisions under Pakistani law, which allow for
        the use of copyrighted material for purposes such as research, private
        study, criticism, review, and news reporting.{" "}
      </p>
      <br />
      <h4 className="text-2xl font-[opensans] dark:text-red-700">
        Prohibited Actions
      </h4>
      <p>Users are prohibited from:</p>
      <ul>
        <li className="ml-4 list-disc">
          Modifying, distributing, or transmitting any content from the ANP
          website without prior written consent.
        </li>
        <li className="ml-4 list-disc">
          Using the website's content for commercial purposes.
        </li>
        <li className="ml-4 list-disc">
          Removing any copyright or proprietary notices from the content.
        </li>
      </ul>
      These restrictions ensure compliance with both national and international
      copyright laws, safeguarding the intellectual property rights of content
      creators.
      <br />
      <h4 className="text-2xl font-[opensans] dark:text-red-700">
        Reporting Copyright Infringements
      </h4>
      <p>
        If you believe that your copyrighted work has been used on the ANP
        website without authorization, you are encouraged to contact the ANP
        promptly. The party is committed to addressing such concerns in
        accordance with the procedures outlined in the Pakistan Copyright
        Ordinance, 1962.
      </p>
      <br />
      <p>
        By adhering to this Copyright Policy, the ANP demonstrates its
        commitment to respecting intellectual property rights, in line with both
        Pakistani legislation and international conventions.
      </p>
    </div>
  );
}
